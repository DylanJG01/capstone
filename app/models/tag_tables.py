from .db import db, add_prefix_for_prod

story_tags = db.Table('story_tags',
    db.Column('story_id', db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
)

user_tags = db.Table('user_tags',
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
)
