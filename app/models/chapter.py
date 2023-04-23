from .db import db, environment, SCHEMA, add_prefix_for_prod

class Chapter(db.Model):
    __tablename__ = 'chapters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), default="Untitled")
    body = db.Column(db.Text(), default="")
    cost = db.Column(db.Integer, default=0)
    story_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), nullable=False)
    stories = db.relationship("Story", back_populates="chapters")
    # story = db.relationship('Story', backref='chapters')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'cost': self.cost,
            'story_id': self.story_id
        }
