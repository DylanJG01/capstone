from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Story, User, Tag, story_tags, Chapter
from app.forms.story_form import StoryForm
from ..models.db import db
from ._AWS_helpers import upload_file_to_AWS, get_unique_filename, remove_file_from_s3

story_routes = Blueprint('stories', __name__)

@story_routes.route('/recommended')
def recommended_stories():
    """
    Query for all the stories matching the user's top three tags.
    """
    if not hasattr(current_user, 'id'):
        return_item = {}
        user_tags = ['Romance', 'Fantasy', 'Mystery']
        for tag_name in user_tags:
            stories = Story.query.filter(Story.published == True)\
            .join(Tag, Story.tags)\
            .filter((Tag.name == tag_name))\
            .limit(5)
            # return_item[tag] = [story.to_dict() for story in stories]
            return_item[tag_name] = []
            for story in stories:
                new_story = story.to_dict()
                new_story['numChapters'] = len(story.chapters)
                new_story['avg'] = 0
                new_story['count'] = 0
                if story.chapters:
                    new_story['firstChapterId'] = story.chapters[0].id
                    for chapter in story.chapters:
                        for review in chapter.reviews:
                            new_story['avg'] += review.stars
                            new_story['count'] += 1
                    if new_story['avg']:
                        new_story['avg'] /= new_story['count']
                return_item[tag_name].append(new_story)
        return  return_item, 200

    user = User.query.get(current_user.id)
    return_item = {}
    for tag in user.tags:
        stories = Story.query.filter(Story.published == True)\
            .join(Tag, Story.tags)\
            .filter((Tag.name == tag.name))\
            .limit(5)
        return_item[tag.name] = []
        for story in stories:
            new_story = story.to_dict()
            new_story['numChapters'] = len(story.chapters)
            new_story['avg'] = 0
            new_story['count'] = 0
            if story.chapters:
                new_story['firstChapterId'] = story.chapters[0].id
                for chapter in story.chapters:
                    for review in chapter.reviews:
                        new_story['avg'] += review.stars
                        new_story['count'] += 1
                if new_story['avg']:
                    new_story['avg'] /= new_story['count']
            return_item[tag.name].append(new_story)
    return return_item, 200

@story_routes.route('/<int:id>')
def story(id):
    """
    Query for a story by id and returns that story in a dictionary
    """
    story = Story.query.get(id)
    if story:
        return_obj = story.to_dict()
        return_obj['allChapters'] = {}
        return_obj['avg'] = 0
        return_obj['count'] = 0
        index = 1
        for chapter in story.chapters:
            return_obj['allChapters'][chapter.id] = chapter.to_dict()
            return_obj['allChapters'][chapter.id]['index'] = index
            try:
                return_obj['allChapters'][chapter.id]['nextChapterId'] = story.chapters[index].id
            except IndexError:
                return_obj['allChapters'][chapter.id]['nextChapterId'] = None
            index += 1

            for review in chapter.reviews:
                return_obj['avg'] += review.stars
                return_obj['count'] += 1
            if return_obj['avg']:
                return_obj['avg'] /= return_obj['count']
        return return_obj, 200
    return {}, 404

@story_routes.route('/<int:sid>/chapter/<int:cid>')
def story_and_chapter(sid, cid):
    """
    Query for a story by id and/then all chapters associated with that story, and then
    return the cid (chapter_id) in that list.
    """

    story = Story.query.get(sid)
    return_object = story.to_dict()

    for chapter in story.chapters:
        if chapter.id == cid:
            return_object['singleChapter'] = chapter.to_dict()
            return return_object, 200

    return return_object, 200
    return {}, 404

@story_routes.route('/', methods=['POST'])
def create_story():
        """
        POST A NEW STORY! AND MAKE A NEW CHAPTER ATTACHED TO IT
        """
        form = StoryForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            new_story = Story()
            form.populate_obj(new_story)
            image = form.data["the_cover"]
            if image:
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_AWS(image)
                new_story.cover = upload["url"]
            db.session.add(new_story)
            db.session.flush()
            # tags_obj = request.get_json()
            # for tag in tags_obj['tag']:
            tag = Tag.query.filter(Tag.name == form.data['tag']).first()
            if tag:
                new_story.tags.append(tag)
            # new_chapter = Chapter(story_id=new_story.id)
            # db.session.add(new_chapter)
            db.session.commit()
            return_obj = new_story.to_dict()
            # return_obj['singleChapter'] = new_chapter.to_dict()
            return return_obj, 200
        return {}, 500

# @story_routes.route('/<int:id>/publish', methods=['PUT'])
# @login_required
# def publish_story(id):

#     form = StoryForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         story_to_edit = Story.query.get(id)
#         form.populate_obj(story_to_edit)

#         db.session.commit()
#         return_obj = story_to_edit.to_dict()
#         # return_obj['tags'] = story_to_edit.tags[-1].name

#         return_obj['allChapters'] = {}
#         for chapter in story_to_edit.chapters:
#             return_obj['allChapters'][chapter.id] = chapter.to_dict()

#         return return_obj, 200
#     return {"falure" : "FAILURE"}

@story_routes.route('/<int:id>', methods=['PUT', 'DELETE'])
@login_required
def delete_edit_story(id):
    """
    Edit or delete a story details.
    """
    if request.method == "DELETE":
        story = Story.query.get(id)
        remove_file_from_s3(story.cover)
        db.session.delete(story)
        db.session.commit()
        return {"message": "story deleted"}, 204
    if request.method == "PUT":
        form = StoryForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            story_to_edit = Story.query.get(id)
            image = form.data["the_cover"]
            current_cover = story_to_edit.cover
            print(form.data)
            print(form.data)
            print(form.data)
            print(form.data)
            print(form.data)
            print(form.data)
            form.populate_obj(story_to_edit)

            if image:
                if story_to_edit.cover:
                    remove_file_from_s3(story_to_edit.cover)
                image.filename = get_unique_filename(image.filename)
                upload = upload_file_to_AWS(image)
                story_to_edit.cover = upload["url"]
            if not image and current_cover:
                story_to_edit.cover = current_cover
            # tags_obj = request.get_json()
            # for tag in tags_obj['tags']:
            #     tag = Tag.query.filter(Tag.name == tag).all()
            #     if tag:
            #         story_to_edit.tags.append(tag)
            db.session.commit()
            return_obj = story_to_edit.to_dict()
            # return_obj['tags'] = story_to_edit.tags[-1].name

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
    if not user:
        return {"Message": "No Story Found"}, 404
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
    return_obj = {}
    for story in stories:
        return_obj[story.id] = story.to_dict()
        return_obj[story.id]['avg'] = 0
        return_obj[story.id]['count'] = 0
        if story.chapters:
            return_obj[story.id]['firstChapterId'] = story.chapters[0].id
            return_obj[story.id]['numChapters'] = len(story.chapters)
            for chapter in story.chapters:
                for review in chapter.reviews:
                    return_obj[story.id]['avg'] += review.stars
                    return_obj[story.id]['count'] += 1
            if return_obj[story.id]['count']:
                    return_obj[story.id]['avg'] /= return_obj[story.id]['count']
    return return_obj, 200
