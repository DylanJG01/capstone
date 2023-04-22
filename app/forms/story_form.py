from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import User

class StoryForm(FlaskForm):
    title = StringField('title')
    cover = StringField('cover')
    description = StringField('description')
    status = BooleanField('status')
    cost = IntegerField('cost')
    published = BooleanField('published')
    user_id = IntegerField('user_id', [DataRequired()])
    mature = BooleanField('mature')
