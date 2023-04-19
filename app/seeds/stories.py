from app.models import db, Story, Tag, environment, SCHEMA

def seed_stories():
    story1 = Story(
        user_id = 1,
    )
    story2 = Story(
        user_id = 1,
    )
    tag1 = Tag.query.get(3)
    tag2 = Tag.query.get(2)

    story1.tags.append(tag1)
    story1.tags.append(tag2)

    db.session.add(story1)
    db.session.add(story2)
    db.session.commit()

def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
