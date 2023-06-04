from .db import db, add_prefix_for_prod, SCHEMA, environment

authorized_readers = db.Table('authorized_readers',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('chapter_id', db.Integer, db.ForeignKey(add_prefix_for_prod('chapters.id')), primary_key=True)
)

if environment == "production":
    authorized_readers.schema = SCHEMA
