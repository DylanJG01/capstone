from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer)

    chapter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chapter.id')))
    chapter = db.relationship('Chapter', back_populates="reviews")
