from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import Story

class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    @staticmethod
    def is_connected_to_stories(tag_id):
        return bool(Story.query.filter(Story.tags.any(id=tag_id)).first())
