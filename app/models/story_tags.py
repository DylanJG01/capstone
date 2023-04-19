from .db import db, add_prefix_for_prod, SCHEMA, environment

story_tags = db.Table('story_tags',
    db.Model.metadata,
    db.Column('story_id', db.Integer, db.ForeignKey(add_prefix_for_prod('stories.id')), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey(add_prefix_for_prod('tags.id')), primary_key=True)
)

if environment == "production":
    story_tags.schema = SCHEMA
