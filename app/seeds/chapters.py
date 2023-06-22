from app.models import db, Chapter, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_chapters():
    chapter1 = Chapter(
        title='The Awakening',
        body="""
        The night was draped in a celestial cloak, as the full moon ascended to its zenith, casting an ethereal glow upon the land. In the heart of the ancient forest, a soft breeze rustled through the leaves, carrying whispers of forgotten enchantments. It was in this sacred place that a young woman, Seraphina, found herself drawn on this fateful night.

        As she ventured deeper into the woods, an otherworldly luminescence danced through the canopy, guiding her path. Seraphina's heart fluttered with a mix of trepidation and anticipation, for she was on a quest to unlock the secrets of the Eternal Moonfire. Legends spoke of its transformative power, capable of granting unimaginable abilities to those who could harness its energy.

        The forest grew denser, its ancient trees towering like sentinels guarding mystical knowledge. Seraphina's steps faltered momentarily as a sense of awe washed over her. She could feel the pulsating energy of the moonfire growing stronger, resonating within her very core. It was as if the forest itself whispered her name, inviting her to partake in its enchantment.

        With renewed determination, Seraphina pressed on, her senses heightened, attuned to the subtlest of sounds and vibrations. Ancient symbols carved into the bark of trees marked her path, an arcane map guiding her towards her destiny. The air grew heavy with anticipation, each breath pregnant with possibility. Seraphina's heart raced, echoing the rhythm of the mystical realm she now traversed.

        And so, under the watchful gaze of the eternal moon, Seraphina continued her solitary journey, her destiny intertwined with the luminous powers that awaited her. Little did she know that her every step drew her closer to a world of wonders, challenges, and a love that would transcend the boundaries of time itself. The stage was set, and Seraphina was about to embark on an extraordinary odyssey where the eternal moonfire would shape her destiny in ways she could never have imagined.
        """,
        story_id=1,
        published=True
    )
    chapter2 = Chapter(
        body="",
        story_id=1,
        published=True,
        cost=2
    )
    chapter3 = Chapter(
        body="""
        TEST
        TEST
        TEST
        TEST
        """,
        story_id=2,
        published=True
    )
    chapters = [
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=3,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=4,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=5,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=6,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=7,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=8,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=9,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=10,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=11,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=12,
        published=True
        ),
        Chapter(
        title="untitled",
        body="once there was a twice and then there were a many and then none. Huzzah.",
        story_id=13,
        published=True
        )
    ]

    db.session.add(chapter1)
    db.session.add(chapter2)
    db.session.add(chapter3)
    [db.session.add(chapter) for chapter in chapters]

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
