from app.models import db, Chapter, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_chapters():
    chapter1 = Chapter(
        body="Testing test",
        story_id=1
    )
    chapter2 = Chapter(
        body="Testing test",
        story_id=1
    )
    chapter3 = Chapter(
        body="Testing test",
        story_id=2
    )
    db.session.add(chapter1)
    db.session.add(chapter2)
    db.session.add(chapter3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_chapters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.chapters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM chapters"))

    db.session.commit()
