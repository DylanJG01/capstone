from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import Story, User, Tag, story_tags
from ..models.db import db

story_routes = Blueprint('stories', __name__)


@story_routes.route('/recommended')
def recommended_stories():
    """
    Query for all the stories matching the user's top three tags.
    """
    if not hasattr(current_user, 'id'):
        return_item = {}
        user_tags = ['Romance', 'Fantasy', 'Mystery']
        for tag in user_tags:
            stories = Story.query\
            .join(Tag, Story.tags)\
            .filter((Tag.name == tag))\
            .limit(5)
            return_item[tag] = [story.to_dict() for story in stories]
        return  return_item, 200

    user = User.query.get(current_user.id)\
          .join(Tag, User.tags)

    return {"whaddup" : thug}


@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {"stories" : [story.to_dict() for story in stories]}

@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    return story.to_dict()
