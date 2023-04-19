from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tag_tables import story_tags


class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), default="Untitled")
    cover = db.Column(db.String(255), default="")
    description = db.Column(db.String(1000), default="")
    status = db.Column(db.Boolean, default=False)
    cost = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"))

    tags = db.relationship('Tag', secondary=story_tags, backref=db.backref('stories', lazy='dynamic'))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'description': self.description,
            'status': self.status,
            'cost': self.cost,
            'user_id': self.user_id,
            'tag_id': self.tag_id,
        }
