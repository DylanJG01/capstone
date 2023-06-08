from app.models import db, Category, environment, SCHEMA
from sqlalchemy.sql import text

def seed_categories():

    categories = [
        Category(name="Romance"),
        Category(name="Fantasy"),
        Category(name="Mystery"),
        Category(name="Contemporary"),
        Category(name="Action"),
        Category(name="Adventure"),
        Category(name="Angst"),
        Category(name="Horror"),
        Category(name="Drama"),
        Category(name="Fairy Tale"),
        Category(name="Ficton"),
        Category(name="Humor"),
        Category(name="Comedy"),
        Category(name="Mythology"),
        Category(name="Short Story"),
        Category(name="Poetry"),
        Category(name="Legend"),
        Category(name="Historical Fiction"),
        Category(name="Nonfiction"),
        ]

    [db.session.add(category) for category in categories]
    db.session.commit()

def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM categories"))

    db.session.commit()
