from app.models import db, Story, Tag, environment, SCHEMA
from sqlalchemy.sql import text
from random import randrange

def seed_stories():
    story1 = Story(
        user_id = 1,
        cover = 'https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg'
    )
    story2 = Story(
        user_id = 1,
        cover = 'https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg'
    )
    stories = [
        Story(
            user_id = 1,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #0
        Story(
            user_id = 1,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #1
        Story(
            user_id = 1,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #2
        Story(
            user_id = 1,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #3
        Story(
            user_id = 1,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #4
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #5
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #6
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #7
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #8
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #9
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description"
        ), #10
    ]

    tags = Tag.query.all()

    story1.tags.append(tags[0])
    story1.tags.append(tags[1])
    story2.tags.append(tags[0])
    story2.tags.append(tags[1])

    stories[0].tags.append(tags[1])
    stories[1].tags.append(tags[1])
    stories[2].tags.append(tags[2])
    stories[3].tags.append(tags[2])

    stories[4].tags.append(tags[2])

    stories[5].tags.append(tags[2])
    stories[6].tags.append(tags[3])
    stories[7].tags.append(tags[3])
    stories[8].tags.append(tags[0])
    stories[9].tags.append(tags[0])

    [db.session.add(story) for story in stories]

    db.session.add(story1)
    db.session.add(story2)
    db.session.commit()

def undo_stories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.stories RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM stories"))

    db.session.commit()
