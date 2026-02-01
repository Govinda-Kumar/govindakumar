#!/bin/sh
set -e

# Use PORT from environment or default to 80
PORT=${PORT:-80}

# Inject runtime configuration
VITE_API_URL=${VITE_API_URL:-http://localhost:8001}
echo "Injecting VITE_API_URL: $VITE_API_URL"

cat > /usr/share/nginx/html/config.js <<EOF
// Runtime configuration
window.ENV_CONFIG = {
  VITE_API_URL: '${VITE_API_URL}'
};
EOF

# Create nginx config with dynamic port
cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen $PORT;
    server_name _;
    
    # Root directory
    root /usr/share/nginx/html;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_types
      text/plain
      text/css
      text/xml
      text/javascript
      application/json
      application/javascript
      application/xml+rss
      application/atom+xml
      image/svg+xml;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Main location - SPA routing
    location / {
        try_files \$uri \$uri/ /index.html;
    }
    
    # Cache static assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Don't cache index.html (so updates are immediate)
    location = /index.html {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
EOF

echo "Starting nginx on port $PORT..."
exec nginx -g "daemon off;"
