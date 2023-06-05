from .db import db, add_prefix_for_prod, SCHEMA, environment

purchased_chapters = db.Table('purchased_chapters',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('chapter_id', db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')), primary_key=True)
)

if environment == "production":
    purchased_chapters.schema = SCHEMA
