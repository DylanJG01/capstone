from app.models import db, Tag, environment, SCHEMA

def seed_tags():
    tag1 = Tag(name="Tag1")
    tag2 = Tag(name="Tag2")
    tag3 = Tag(name="Tag3")

    db.session.add(tag1)
    db.session.add(tag2)
    db.session.add(tag3)
    db.session.commit()

def undo_tags():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
