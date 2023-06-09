from .db import db, add_prefix_for_prod, SCHEMA, environment

user_categories = db.Table('user_categories',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    db.Column('category_id', db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')), primary_key=True)
)

if environment == "production":
    user_categories.schema = SCHEMA
