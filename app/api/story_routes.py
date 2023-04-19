from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Story

user_routes = Blueprint('stories', __name__)


@user_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {"stoires" : [story.to_dict() for story in stories]}

@user_routes.route('/<int:id>')
@login_required
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    return story.to_dict()
