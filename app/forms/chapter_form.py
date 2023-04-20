from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import User

class ChapterForm(FlaskForm):
    body = StringField('body')
    cost = IntegerField('cost')
    story_id = IntegerField('story_id', DataRequired())
