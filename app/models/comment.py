from .db import db, environment, SCHEMA, add_prefix_for_prod

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500))

    chapter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')))
    chapter = db.relationship('Chapter', back_populates="comments")

    def to_dict(self):
        return {
            'comment': self.comment
        }
