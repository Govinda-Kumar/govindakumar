from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class ProjectBase(BaseModel):
    title: str
    description: str
    thumbnail_url: str
    video_preview_url: str
    category: str
    is_featured: bool

class Project(ProjectBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True  # For Pydantic v2 (or orm_mode = True for v1)