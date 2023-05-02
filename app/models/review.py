from .db import db, exnviroment, SCHEMA, add_prefix_for_prod

class Review(db.model):
    __tablename__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    stars = db.Column(db.Integer)
