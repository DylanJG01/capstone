from app.models import db, User, Category, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo',
        email='demo@aa.io',
        password='password',
        coins=1
        )
    marnie = User(
        username='marnie',
        email='marnie@aa.io',
        password='password',
        coins=1
        )
    bobbie = User(
        username='bobbie',
        email='bobbie@aa.io',
        password='password',
        coins=1
        )
    demo_user = User(
        username='RandomDelight',
        email='something@aa.io',
        password='password',
        coins=1
    )
    extra = [
        User(
        username='SillyDog',
        email='something3@aa.io',
        password='password',
        coins=1
        ),
        User(
        username='CoolCat',
        email='something1@aa.io',
        password='password',
        coins=1
        ),
        User(
        username='TheBLAH',
        email='something2@aa.io',
        password='password',
        coins=1
        ),
    ]
    another_demo = User(
        username='wraith-writer',
        email='wraith@aa.io',
        password='password',
    )

    category1 = Category.query.get(1)
    category2 = Category.query.get(2)
    category3 = Category.query.get(3)

    demo_user.categories.append(category1)
    demo_user.categories.append(category2)

    demo.categories.append(category1)
    demo.categories.append(category2)

    another_demo.categories.append(category1)
    another_demo.categories.append(category3)

    db.session.add(demo_user)
    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    for item in extra:
        db.session.add(item)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
