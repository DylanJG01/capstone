from .db import db, environment, SCHEMA, add_prefix_for_prod

class Chapter(db.Model):
    __tablename__ = 'chapters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text(), default="")
    cost = db.Column(db.Integer, default=0)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')))

    story = db.relationship('Story', backref='chapters')

    def to_dict(self):
        return {
            'id': self.id,
            'body': self.body,
            'cost': self.cost,
            'story_id': self.story_id
        }
