from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review
from app.forms.review_form import ReviewForm
from ..models.db import db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/chapter/<int:id>')
def reviews(id):
    """
    Query for all reviews and returns them in a list of review dictionaries
    """
    reviews = Review.query.filter(Review.chapter_id == id)

    return_obj = {"avg" : 0, 'len': 0}
    for review in reviews:
        return_obj[str(review.id)] = review.to_dict()
        return_obj['avg'] += review.stars
        return_obj['len'] += 1
    if return_obj['avg'] > 0 :
        return_obj['avg'] /= return_obj['len']
    return return_obj , 200

@review_routes.route('/<int:id>', methods=["GET", "PUT", "DELETE"])
def review(id):
    """
    Query for a review by id and returns that review in a dictionary
    """
    review = Review.query.get(id)
    if request.method == "GET":
        return review.to_dict(), 200
    if request.method == "PUT":
        form = ReviewForm()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            review_to_edit = Review.query.get(id)
            form.populate_obj(review_to_edit)
            db.session.commit()
            return review_to_edit.to_dict(), 201
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
        return new_review.to_dict(), 200
