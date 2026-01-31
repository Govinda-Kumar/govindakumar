# api-service/models.py
from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime
from sqlalchemy.sql import func
from database import Base

class Project(Base):
    __tablename__ = "projects_project"  # MUST match Django's table name
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    thumbnail_url = Column(String(1000), nullable=False)
    video_preview_url = Column(String(1000), nullable=False)
    category = Column(String(50), nullable=False, default='trending')
    is_featured = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Project {self.title}>"