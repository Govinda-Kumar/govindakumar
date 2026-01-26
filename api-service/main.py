from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
import models
import database

app = FastAPI(title="GovindaKumar Portfolio API")

# VERY IMPORTANT: Allow React to talk to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, replace with your React URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/projects")
def get_all_projects(db: Session = Depends(get_db)):
    return db.query(models.Project).all()

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

