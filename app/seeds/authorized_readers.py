from app.models import db, authorized_readers, environment, SCHEMA
from sqlalchemy.sql import text


def seed_authorized_readers():
    readers = [
        {'user_id': 1, 'chapter_id': 10}
        ]
    stmt = authorized_readers.insert().values(readers)
    db.session.execute(stmt)
    db.session.commit();


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_authorized_readers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.authorized_readers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM authorized_readers"))

    db.session.commit()
