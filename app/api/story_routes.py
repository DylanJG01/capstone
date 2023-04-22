from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Story, User, Tag, story_tags, Chapter
from app.forms.story_form import StoryForm
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

@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    return_obj = story.to_dict()
    return_obj['allChapters'] = {}
    for chapter in story.chapters:
        return_obj['allChapters'][chapter.id] = chapter.to_dict()
    return return_obj, 200

@story_routes.route('/<int:sid>/chapter/<int:cid>')
def story_and_chapter(sid, cid):
    """
    Query for a story by id and/then all chapters associated with that story, and then
    return the cid (chapter_id) in that list.
    """

    story = Story.query.get(sid) # Get me dat stori
    return_object = story.to_dict()

    try:
        chapter = story.chapters[cid - 1]
    except IndexError:
        return_object['singleChapter'] = {'title' : "Doesn't Exist",
                                    'body': """
                                    Either an error occured on the backend, oops!
                                    Or you're going to places you shouldn't!
                                    There is no chapter here.
                                    """}
        return return_object, 200
    return_object['singleChapter'] = chapter.to_dict()
    return return_object, 200

@story_routes.route('/', methods=['POST'])
def create_story():
        """
        POST A NEW STORY! AND MAKE A NEW CHAPTER ATTACHED TO IT
        """
        form = StoryForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            del form['csrf_token']
            new_story = Story(**form.data)
            db.session.add(new_story)
            db.session.flush()
            new_chapter = Chapter(story_id=new_story.id)
            db.session.add(new_chapter)
            db.session.commit()
            return_obj = new_story.to_dict()
            return_obj['singleChapter'] = new_chapter.to_dict()
            return return_obj, 200
        return {}, 500

@story_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
def delete_edit_story(id):
    """
    Edit or delete a story details.
    """
    if request.method == "DELETE":
        story = Story.query.get(id)
        db.session.delete(story)
        db.session.commit()
        return {"message": "story deleted"}, 204
    if request.method == "PUT":
        form = StoryForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            story_to_edit = Story.query.get(id)
            form.populate_obj(story_to_edit)
            db.session.commit()

            return_obj = story_to_edit.to_dict()
            return_obj['allChapters'] = {}
            for chapter in story_to_edit.chapters:
                return_obj['allChapters'][chapter.id] = chapter.to_dict()

            return return_obj, 200
    return {"falure" : "FAILURE"}

@story_routes.route('/<string:username>')
def get_stories_by_user(username):
    """
    Get all of a user's stories.
    """
    user = User.query.filter_by(username=username).first()
    another_obj = {}
    for story in user.stories:
        another_obj[story.id] = story.to_dict()
    # print(another_obj)
    return another_obj, 200


@story_routes.route('/')
def stories():
    """
    Query for all stories and returns them in a list of story dictionaries
    """
    stories = Story.query.all()
    return {"stories" : [story.to_dict() for story in stories]}
