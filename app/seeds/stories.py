from app.models import db, Story, Tag, environment, SCHEMA
from sqlalchemy.sql import text
from random import randrange

def seed_stories():
    story1 = Story(
        user_id = 1,
        cover = 'https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg',
        title = 'Sin Eater',
        published = True,
    )
    story2 = Story(
        user_id = 1,
        cover = 'https://legacynyplorg-live.s3.amazonaws.com/s3fs-public/a_desolation_called_peace_book_cover.jpg',
        title = "A Desolation Called Peace",
        published=True
    )
    stories = [
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/41CKw0DiUJL.jpg",
            description="A testing description",
            published=True
        ), #0
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/51xfs0AnKkL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
            title = 'The Blade Itself',
            description="A very good fantasy novel",
            published=True
        ), #1
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/I/51ZMTnBFNVL.jpg",
            description="The sequel to 'The Blade Itself'",
            title = "Before They Are Hanged",
            published=True
        ), #2
        Story(
            user_id = 1,
            cover="https://m.media-amazon.com/images/P/B09KZ8SNS6.01._SCLZZZZZZZ_SX500_.jpg",
            description="Foundation Series",
            title = "Foundation",
            published=True

        ), #3
        Story(
            user_id = 1,
            cover="https://pictures.abebooks.com/isbn/9781435162877-us.jpg",
            description="I heard this is a popular one",
            title = "Count of Monte Cristo",
            published=True
        ), #4
        Story(
            user_id = 2,
            cover="https://pictures.abebooks.com/isbn/9780008152321-us.jpg",
            description="Magical child soldiers, hurray!",
            title = "Red Sister",
            published=True
        ), #5
        Story(
            user_id = 2,
            cover="https://upload.wikimedia.org/wikipedia/en/0/0f/The_Traitor_Baru_Cormorant_%28first_edition_cover%29.jpg",
            description="What would you do to defeat the empire that colonized your home?",
            title = "The Traitor Baru Cormorant",
            published=True

        ), #6
        Story(
            user_id = 2,
            cover="https://pictures.abebooks.com/isbn/9780553380958-us.jpg",
            description="Dystopian hacker races to stop a language virus",
            title = "Snow Crash",
            published=True
        ), #7
        Story(
            user_id = 2,
            cover="https://upload.wikimedia.org/wikipedia/en/e/ee/DoAndroidsDream.png",
            description="A testing description",
            title = "Do Androids Dream of Electric Sheep?",
            published=True
        ), #8
        Story(
            user_id = 2,
            cover="https://m.media-amazon.com/images/I/51f1jqTYNxL.jpg",
            description="Mercenaries get up to the darndest things.",
            title = "The Black Company",
            published=True
        ), #9
        Story(
            user_id = 2,
            cover="https://s26162.pcdn.co/wp-content/uploads/2020/01/Sin-Eater-by-Megan-Campisi-677x1024.jpg",
            description="A testing description",
            published=True
        ), #10
    ]

    tags = Tag.query.all()

    story1.tags.append(tags[0])
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
