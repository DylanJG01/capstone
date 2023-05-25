from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired

class ChapterForm(FlaskForm):
    body = StringField('body')
    cost = IntegerField('cost')
    title = StringField('title')
    story_id = IntegerField('story_id', [DataRequired()])
