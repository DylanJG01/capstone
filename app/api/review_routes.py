from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review
from app.forms.review_form import ReviewForm
from ..models.db import db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/chapter/<int:id>')
def reviews(id):
    reviews = Review.query.filter(Review.chapter_id == id)

    return_obj = {}
    for review in reviews:
        return_obj[review.id] = review.to_dict()
        return_obj[review.id]['user'] = review.user.to_dict()

    return return_obj , 200

@review_routes.route('/<int:id>', methods=["GET", "PUT", "DELETE"])
def review(id):
    review = Review.query.get(id)
    if request.method == "GET":
        return review.to_dict(), 200
    if request.method == "PUT":
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            edited_review = Review.query.get(id)
            form.populate_obj(edited_review)
            db.session.commit()

            return_obj = edited_review.to_dict()
            return_obj['user'] = edited_review.user.to_dict()
            return return_obj, 201
    if request.method == "DELETE":
        db.session.delete(review)
        db.session.commit()
        return {"message": "Review Deleted"}, 204

@review_routes.route('/new', methods=['POST'])
def new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        del form['csrf_token']
        new_review = Review(**form.data)
        db.session.add(new_review)
        db.session.commit()
        return_obj = new_review.to_dict()
        return_obj['user'] = new_review.user.to_dict()
        return return_obj, 201
