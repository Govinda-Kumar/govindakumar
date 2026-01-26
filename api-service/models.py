from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class Project(Base):
    __tablename__ = "projects_project" # Django names tables: appname_modelname

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(String)
    thumbnail_url = Column(String)
    video_preview_url = Column(String)
    category = Column(String)
    is_featured = Column(Boolean)
