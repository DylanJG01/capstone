from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tags():

    tags = [
        Tag(name="lovestory"),
        Tag(name="epicfantasy"),
        Tag(name="diversity"),
        Tag(name="strongfemalelead"),
        Tag(name="rhinoceros"),
        Tag(name="ghostsandghouls"),
        Tag(name="theendofallthings"),
        Tag(name="teenfic"),
        Tag(name="angst"),
        Tag(name="newadult"),
        Tag(name="clingy"),
        Tag(name="loving"),
        ]


    [db.session.add(tag) for tag in tags]
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
