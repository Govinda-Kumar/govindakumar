from fastapi import FastAPI, Query, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Optional
import models
from database import get_db
import logging
import sys
import os

# Database Dependency
# def get_db():
#     db = database.SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger(__name__)

app = FastAPI(title="Portfolio API", version="1.0.0")

# CORS Configuration
ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS if os.getenv("ENV") == "production" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 API Service Started!")
    logger.info(f"Environment: {os.getenv('ENV', 'development')}")
@app.get("/")
def root():
    logger.info("Root endpoint called")
    return {"message": "API Service is running"}

@app.get("/projects")
def get_projects(
    category: Optional[str] = Query(None), 
    is_featured: Optional[bool] = Query(None),
    db: Session = Depends(get_db)
):
    # logger.info("=" * 50)
    # logger.info("GET /projects endpoint called")
    # logger.info(f"Params - category: {category}, is_featured: {is_featured}")
    # logger.info(f"is_featured type: {type(is_featured)}")
    
    # Start with base query
    query = db.query(models.Project)
    
    # Apply filters
    if is_featured is not None:
        # logger.warning(f"🔍 Filtering by is_featured = {is_featured}")
        query = query.filter(models.Project.is_featured == is_featured)
    # else:
    #     logger.warning("⚠️ No is_featured filter applied")
    
    if category:
        # logger.warning(f"🔍 Filtering by category = {category}")
        query = query.filter(models.Project.category == category)
    # else:
        # logger.warning("⚠️ No category filter applied")
    
    # Execute query
    projects = query.all()
    # logger.info(f"📊 Found {len(projects)} projects")
    
    # Debug: Print each project
    # for p in projects:
    #     logger.info(f"  📝 ID:{p.id} | {p.title} | featured:{p.is_featured} | category:{p.category}")
    
    logger.info("=" * 50)
    
    return projects


# Note: The parameterized `get_projects` above handles filtering and listing. Removed duplicate endpoint to avoid overriding behavior.

@app.get("/projects/featured")
def get_featured(db: Session = Depends(get_db)):
    # Try to find a featured project
    project = db.query(models.Project).filter(models.Project.is_featured == True).first()
    
    # If none is featured, just return the newest project so the Hero isn't empty
    if not project:
        project = db.query(models.Project).order_by(models.Project.id.desc()).first()
        
    return project

@app.get("/projects/search")
def search_projects(q: str = "", db: Session = Depends(get_db)):
    if not q:
        return []
    # Search for the query 'q' in title or description (case-insensitive)
    return db.query(models.Project).filter(
        (models.Project.title.icontains(q)) | 
        (models.Project.description.icontains(q))
    ).all()

@app.get("/health")
def health_check():
    return {"status": "healthy"}