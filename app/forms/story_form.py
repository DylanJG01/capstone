from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList
from wtforms.validators import DataRequired
from app.models import User
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api._AWS_helpers import ALLOWED_EXTENSIONS

class StoryForm(FlaskForm):
    title = StringField('title')
    cover = StringField('cover')
    the_cover = FileField("Cover Image File", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    description = StringField('description')
    cost = IntegerField('cost')
    published = BooleanField('published')
    user_id = IntegerField('user_id', [DataRequired()])
    mature = BooleanField('mature')
    tag_list = StringField('tags')
    category_name = StringField('category')
