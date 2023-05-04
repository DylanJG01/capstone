from .db import db, exnviroment, SCHEMA, add_prefix_for_prod

class Comment(db.model):
    __tablename__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(500), )
    chapter_id = db.Column(db.Integer)
