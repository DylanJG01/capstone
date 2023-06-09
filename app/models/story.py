from .db import db, environment, SCHEMA, add_prefix_for_prod
from .story_tags import story_tags

class Story(db.Model):
    __tablename__ = 'stories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), default="Untitled")
    cover = db.Column(db.String(255), default="")
    description = db.Column(db.String(2000), default="")
    status = db.Column(db.Boolean, default=False)
    cost = db.Column(db.Integer, default=0)
    published = db.Column(db.Boolean, default=False)
    mature = db.Column(db.Boolean, default=False)

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    user = db.relationship("User", back_populates="stories")
    chapters = db.relationship("Chapter", back_populates="stories", cascade="all, delete-orphan")
    tags = db.relationship('Tag', secondary=story_tags, backref='stories', lazy=True)
    category = db.relationship("Category", back_populates="stories")
    # category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))
    category_name = db.Column(db.String(), db.ForeignKey(add_prefix_for_prod('categories.name')))
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'description': self.description,
            'status': self.status,
            'cost': self.cost,
            'mature': self.mature,
            'user_id': self.user_id,
            'category_name': self.category_name
        }
