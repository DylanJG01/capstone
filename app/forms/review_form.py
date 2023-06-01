from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    content = StringField('content')
    stars = IntegerField('stars')
    chapter_id = IntegerField('chapter_id', [DataRequired()])
    user_id = IntegerField('user_id', [DataRequired()])
