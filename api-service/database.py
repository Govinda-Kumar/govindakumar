from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Ensure this matches the database Django is using. 
# For local dev, Django defaults to sqlite3 (db.sqlite3). 
# If you moved to Postgres, use your Postgres URL here.
# SQLALCHEMY_DATABASE_URL = "sqlite:///../admin-service/db.sqlite3"
# The 'db' hostname is handled by Docker's internal DNS
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:postgres@db:5432/netflix_db"


engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
