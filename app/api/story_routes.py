from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Story, User, Tag, story_tags, Chapter
from app.forms import story_form
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

    user = User.query.get(current_user.id)
    return_item = {}
    for tag in user.tags:
        stories = Story.query\
            .join(Tag, Story.tags)\
            .filter((Tag.name == tag.name))\
            .limit(5)
        return_item[tag.name] = [story.to_dict() for story in stories]
    return return_item, 200
    return { }, 200

@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)

    return story.to_dict()

@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {"stories" : [story.to_dict() for story in stories]}


@story_routes.route('/<int:sid>/chapter/<int:cid>')
def story_and_chapter(sid, cid):
    """
    Query for a story by id and/then all chapters associated with that story, and then
    return the cid (chapter_id) in that list.
    """

    story = Story.query.get(sid) # Get me dat stori
    return_object = story.to_dict()

    print (cid)
    try:
        chapter = story.chapters[cid - 1]
    except IndexError as e:
        return_object['chapter'] = {'title' : "Doesn't Exist",
                                    'body': """
                                    Either an error occured on the backend, oops!
                                    Or you're going to places you shouldn't!
                                    There is no chapter here.
                                    """}
        return return_object, 200


    return_object['chapter'] = chapter.to_dict()

    print(story.user)
    return return_object, 200

@story_routes.route('/', methods=['POST','PUT','DELETE'])
def create_edit_delete_story(id):
    if request.method == 'POST':
        form = story_form(**form.data)
        form['csrf_token'].data = request.cookies['csrf_token']
        pass
    if request.method == 'PUT':
        pass
    if request.method == 'DELETE':
        pass

    return {}
