from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import random
# Adds a demo user, you can add other users here if you want
def seed_reviews():

    reviews = [
        Review(stars=0,user_id=1, chapter_id=1, content="This is the worst thing I've ever read! An insult to thought itself!"),
        Review(stars=5,user_id=2, chapter_id=1, content="This is the best thing I've ever read! It really makes you think!"),

        Review(stars=3,user_id=3, chapter_id=1, content='"The Unveiling of Secrets" is an intriguing chapter with suspense. The unexpected twists add depth, but rushed pacing and unclear plot execution hinder the impact. Improved pacing and clarity would make it more immersive. Despite flaws, it keeps readers engaged and curious about what lies ahead.'),

        # Review(stars=2, chapter_id=1, content="I found 'The Unveiling of Secrets' to be somewhat disappointing. While it had potential with its suspenseful atmosphere, the execution fell short. The pacing felt off, and the plot twists lacked impact. It left me wanting more coherence and depth."),

        # Review(stars=4, chapter_id=1, content="A compelling chapter that keeps you hooked. 'The Unveiling of Secrets' delivers unexpected twists that make you question everything. Though the pacing could have been smoother, the story's potential shines through, leaving readers eager for the next chapter."),

        # Review(stars=3, chapter_id=1, content="While 'The Unveiling of Secrets' had its moments of intrigue, it struggled to maintain a consistent tone. Some plot elements felt forced, and the pacing was erratic. Nevertheless, the chapter had its captivating moments that kept me invested in the overall storyline."),

        # Review(stars=4, chapter_id=1, content="'The Unveiling of Secrets' is a thrilling chapter that grabs your attention from the start. The unexpected twists and turns add excitement, although the pacing could have been more balanced. Overall, it's a solid addition to the story, leaving readers curious for what's to come."),

        # Review(stars=1, chapter_id=1, content="I regret investing my time in 'The Unveiling of Secrets.' The plot was convoluted, and the twists felt forced. The pacing dragged, making it difficult to stay engaged. It failed to deliver the impact it promised."),

        # Review(stars=5, chapter_id=1, content="'The Unveiling of Secrets' is a masterpiece! The suspense is palpable, and the twists are mind-bending. The author's ability to keep readers guessing is commendable. It's an absolute joy to read and leaves you yearning for more."),

        # Review(stars=3, chapter_id=1, content="While 'The Unveiling of Secrets' had its intriguing moments, the execution fell short. The plot twists lacked depth, and the pacing felt disjointed at times. However, the chapter managed to pique my curiosity, making me want to explore the story further."),

        # Review(stars=4, chapter_id=1, content="In 'The Unveiling of Secrets,' the author skillfully builds suspense, keeping readers on edge throughout. Though the pacing could have been smoother, the unexpected plot twists added excitement. Overall, an engaging chapter that leaves you hungry for more answers."),

        # Review(stars=2, chapter_id=1, content="I struggled to connect with 'The Unveiling of Secrets.' The plot lacked clarity, and the pacing felt uneven. The chapter failed to engage me fully, leaving me unsatisfied with the overall reading experience."),

        # Review(stars=4, chapter_id=1, content="With 'The Unveiling of Secrets,' the author successfully creates an atmosphere of suspense. The plot twists, though they could have been better executed, added depth to the story. While the pacing had its ups and downs, it managed to hold my interest."),

        # Review(stars=3, chapter_id=1, content="'The Unveiling of Secrets' presents intriguing ideas, but the execution fell short. The pacing was inconsistent, and the plot twists lacked a satisfying impact. Nevertheless, the chapter still managed to keep me curious about what lies ahead."),

        # Review(stars=5, chapter_id=1, content="'The Unveiling of Secrets' is a captivating chapter that kept me on the edge of my seat. The unexpected plot twists were brilliantly executed, adding layers to the narrative. The pacing was just right, allowing for an immersive reading experience. I eagerly anticipate the next chapter!"),
    ]

    db.session.bulk_save_objects(reviews)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
