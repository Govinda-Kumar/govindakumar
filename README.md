## Portfolio

govindakumar/
│
├── admin-service/       # Django (The Control Plane)
│   ├── core/            # Django project settings
│   ├── projects/        # Project & Category models
│   ├── manage.py
│   └── Dockerfile
│
├── api-service/         # FastAPI (The Data Plane)
│   ├── main.py          # Fast API routes
│   ├── database.py      # Connection to Postgres
│   ├── schemas.py       # Pydantic models
│   └── Dockerfile
│
├── portfolio-ui/        # React + Vite (The Frontend)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml   # Orchestrates all services
└── .env                 # Shared environment variables (DB URLs, etc.)
