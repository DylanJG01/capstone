from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Chapter
from app.forms.chapter_form import ChapterForm
from ..models.db import db

chapter_routes = Blueprint('chapters', __name__)


@chapter_routes.route('/')
def chapters():
    """
    Query for all stories and returns them in a list of chapter dictionaries
    """
    chapters = Chapter.query.all()
    return {"chapters" : [chapter.to_dict() for chapter in chapters]}

@chapter_routes.route('/<int:id>', methods=["GET","PUT","DELETE"])
def chapter(id):
    """
    Query for a chapter by id and returns that chapter in a dictionary
    """
    chapter = Chapter.query.get(id)

    if request.method == "GET":
        return chapter.to_dict(), 200

    if request.method == "PUT":
        form = ChapterForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            chapter_to_edit = Chapter.query.get(id)
            form.populate_obj(chapter_to_edit)
            db.session.commit()
            return chapter_to_edit.to_dict(), 291
