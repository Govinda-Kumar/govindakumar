from django.db import models

class Project(models.Model):
    # What the user sees
    title = models.CharField(max_length=200)
    description = models.TextField()
    
    # Media Links (You can use images/videos from URLs)
    thumbnail_url = models.URLField(max_length=500) 
    video_preview_url = models.URLField(max_length=500, help_text="Short teaser video URL")
    
    # Categorization for the Netflix Rows
    CATEGORY_CHOICES = [
        ('trending', 'Trending Now'),
        ('web_apps', 'Web Applications'),
        ('machine_learning', 'Machine Learning'),
    ]
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='trending')
    
    # Feature flag for the Big Hero Banner
    is_featured = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
