from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    content = StringField('content')
    chapter_id = IntegerField('story_id', [DataRequired()])
