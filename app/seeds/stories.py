from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text

def seed_stories():
    pass

def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
