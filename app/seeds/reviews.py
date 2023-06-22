from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
import random
# Adds a demo user, you can add other users here if you want
def seed_reviews():

    reviews = [
        # Review(stars=0,user_id=5, chapter_id=1, content="This is the worst thing I've ever read! An insult to thought itself!"),
        # Review(stars=5,user_id=6, chapter_id=1, content="This is the best thing I've ever read! It really makes you think!"),
        # Review(stars=3,user_id=7, chapter_id=1, content='This is pretty average'),
    ]

    # Chapter 1
    reviews.append(Review(stars=3, user_id=5, chapter_id=1, content="This chapter had its moments, but it could have been better."))
    reviews.append(Review(stars=4, user_id=6, chapter_id=1, content="I really enjoyed this chapter! It kept me engaged throughout."))
    reviews.append(Review(stars=2, user_id=7, chapter_id=1, content="I found this chapter to be quite disappointing. It didn't meet my expectations."))

    # Chapter 2
    reviews.append(Review(stars=4, user_id=5, chapter_id=2, content="What an amazing chapter! It exceeded my expectations."))
    reviews.append(Review(stars=5, user_id=6, chapter_id=2, content="This chapter blew my mind! It's a must-read for everyone."))
    reviews.append(Review(stars=3, user_id=7, chapter_id=2, content="A decent chapter overall, but it lacked some depth."))

    # Chapter 3
    reviews.append(Review(stars=2, user_id=5, chapter_id=3, content="I didn't really connect with this chapter. It felt dull."))
    reviews.append(Review(stars=1, user_id=6, chapter_id=3, content="This chapter was a complete letdown. I expected more."))
    reviews.append(Review(stars=3, user_id=7, chapter_id=3, content="An average chapter. It had its moments, but nothing extraordinary."))

    # Chapter 4
    reviews.append(Review(stars=4, user_id=5, chapter_id=4, content="A captivating chapter that kept me hooked until the end."))
    reviews.append(Review(stars=3, user_id=6, chapter_id=4, content="This chapter had its strengths, but it didn't fully captivate me."))
    reviews.append(Review(stars=5, user_id=7, chapter_id=4, content="An exceptional chapter that left me wanting more."))

    # Chapter 5
    reviews.append(Review(stars=1, user_id=5, chapter_id=5, content="This chapter was a disaster. I regret spending time on it."))
    reviews.append(Review(stars=2, user_id=6, chapter_id=5, content="I had high hopes, but this chapter fell short of my expectations."))
    reviews.append(Review(stars=4, user_id=7, chapter_id=5, content="A solid chapter that kept me engaged. I enjoyed the storyline."))

    # Chapter 6
    reviews.append(Review(stars=3, user_id=5, chapter_id=6, content="A decent chapter with some interesting moments, but it lacked depth."))
    reviews.append(Review(stars=5, user_id=6, chapter_id=6, content="This chapter was brilliant! It made me ponder the deeper meaning."))
    reviews.append(Review(stars=4, user_id=7, chapter_id=6, content="I thoroughly enjoyed this chapter. It was well-crafted and engaging."))

    # Chapter 7
    reviews.append(Review(stars=4, user_id=5, chapter_id=7, content="An excellent chapter that left me wanting more. Can't wait for the next one!"))
    reviews.append(Review(stars=3, user_id=6, chapter_id=7, content="This chapter had its strengths, but it didn't fully resonate with me."))
    reviews.append(Review(stars=5, user_id=7, chapter_id=7, content="A remarkable chapter that challenged my perspective. Truly thought-provoking."))

    # Chapter 8
    reviews.append(Review(stars=2, user_id=5, chapter_id=8, content="I found this chapter to be quite disappointing. It didn't live up to the hype."))
    reviews.append(Review(stars=4, user_id=6, chapter_id=8, content="This chapter was enjoyable, but it could have been better paced."))
    reviews.append(Review(stars=3, user_id=7, chapter_id=8, content="An average chapter. It didn't leave a lasting impression."))

    # Chapter 9
    reviews.append(Review(stars=5, user_id=5, chapter_id=9, content="This chapter was exceptional! It left me awestruck with its depth and creativity."))
    reviews.append(Review(stars=3, user_id=6, chapter_id=9, content="A good chapter that had its moments, but it didn't fully captivate me."))
    reviews.append(Review(stars=4, user_id=7, chapter_id=9, content="I found this chapter to be thought-provoking and well-written. A worthwhile read."))

    # Chapter 10
    reviews.append(Review(stars=4, user_id=5, chapter_id=10, content="A captivating chapter that kept me hooked until the end. Highly recommended!"))
    reviews.append(Review(stars=5, user_id=6, chapter_id=10, content="This chapter blew me away! It's a masterpiece of storytelling."))
    reviews.append(Review(stars=3, user_id=7, chapter_id=10, content="An average chapter. It had its moments, but it didn't leave a lasting impression."))

    # Chapter 11
    reviews.append(Review(stars=2, user_id=5, chapter_id=11, content="I expected more from this chapter. It felt lacking and uninspiring."))
    reviews.append(Review(stars=3, user_id=6, chapter_id=11, content="A decent chapter, but it didn't fully resonate with me."))
    reviews.append(Review(stars=5, user_id=7, chapter_id=11, content="This chapter was a game-changer! It challenged my perspective and left me in awe."))

    # Chapter 12
    reviews.append(Review(stars=4, user_id=5, chapter_id=12, content="An excellent closing chapter that wrapped up the story beautifully."))
    reviews.append(Review(stars=2, user_id=6, chapter_id=12, content="I was slightly disappointed with this chapter. It didn't meet my expectations."))
    reviews.append(Review(stars=5, user_id=7, chapter_id=12, content="A remarkable chapter that left a profound impact. It will stay with me for a long time."))

    # Chapter 13
    reviews.append(Review(stars=3, user_id=5, chapter_id=13, content="This chapter had some interesting moments, but it lacked coherence."))
    reviews.append(Review(stars=4, user_id=6, chapter_id=13, content="I enjoyed this chapter overall, but it could have been more engaging."))
    reviews.append(Review(stars=2, user_id=7, chapter_id=13, content="Unfortunately, this chapter didn't resonate with me. It felt disjointed."))

    # Chapter 14
    reviews.append(Review(stars=5, user_id=5, chapter_id=14, content="This chapter exceeded my expectations! It was a thrilling ride from start to finish."))
    reviews.append(Review(stars=4, user_id=6, chapter_id=14, content="I couldn't put this chapter down! It had me on the edge of my seat."))
    reviews.append(Review(stars=3, user_id=7, chapter_id=14, content="A decent chapter with some gripping moments, but it didn't fully captivate me."))

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
