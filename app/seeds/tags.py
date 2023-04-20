from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():


    tags = [
        Tag(name="Romance"),
        Tag(name="Fantasy"),
        Tag(name="Mystery"),
        Tag(name="Contemporary"),
        Tag(name="Action"),
        Tag(name="Adventure"),
        Tag(name="Angst"),
        Tag(name="Horror"),
        Tag(name="Drama"),
        Tag(name="Fairy Tale"),
        Tag(name="Ficton"),
        Tag(name="Humor"),
        Tag(name="Comedy"),
        Tag(name="Mythology"),
        Tag(name="Short Story"),
        Tag(name="Poetry"),
        Tag(name="Legend"),
        Tag(name="Historical Fiction"),
        Tag(name="Nonfiction"),
        ]


    [db.session.add(tag) for tag in tags]
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
