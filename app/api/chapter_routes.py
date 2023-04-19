from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Chapter

chapter_routes = Blueprint('chapters', __name__)


@chapter_routes.route('/')
def chapters():
    """
    Query for all stories and returns them in a list of chapter dictionaries
    """
    chapters = Chapter.query.all()
    return {"chapters" : [chapter.to_dict() for chapter in chapters]}

@chapter_routes.route('/<int:id>')
def chapter(id):
    """
    Query for a chapter by id and returns that chapter in a dictionary
    """
    chapter = Chapter.query.get(id)
    return chapter.to_dict()
