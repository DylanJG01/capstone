from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, purchased_chapters, db
from sqlalchemy import select

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/purchase_chapter', methods=["POST"])
@login_required
def purchase_chapter():
    """
    Purchase a chapter. Adding to the list of readable chapters the user has
    and deducting the cost of said chapter from their coins.
    """
    data = request.get_json()['data'];

    user_id = data['user_id']
    chapter_id = data['chapter_id']
    cost = data['cost']
    seller_id = data['writer_id']

    new_purchased_chapter = { 'user_id' : user_id, 'chapter_id': chapter_id }
    stmt = db.insert(purchased_chapters).values(new_purchased_chapter)
    db.session.execute(stmt)

    selling_user = User.query.get(seller_id)

    active_user = User.query.get(user_id)
    active_user.coins -= cost
    selling_user.coins += cost
    db.session.commit()

    query = select(purchased_chapters.c.chapter_id).where(purchased_chapters.c.user_id == active_user.id)
    results = db.session.execute(query).all()
    user = active_user.to_dict()
    user['purchased_chapters'] = {}
    for result in results:
        user['purchased_chapters'][result[0]] = True
    return user, 200

@user_routes.route('/purchase_coins', methods=["POST"])
@login_required
def purchase_coins():
    """
    Add coins to a user and then return said user object.
    """
    data = request.get_json()['data'];
    user = User.query.get(current_user.id)
    if user.coins == None:
        user.coins = 0
    user.coins += data['coins']
    db.session.commit()

    query = select(purchased_chapters.c.chapter_id).where(purchased_chapters.c.user_id == current_user.id)
    results = db.session.execute(query).all()
    return_obj = user.to_dict()
    return_obj['purchased_chapters'] = {}
    for result in results:
        return_obj['purchased_chapters'][result[0]] = True


    return return_obj, 200

@user_routes.route('/deactivate_wallet', methods=["DELETE"])
@login_required
def deactivate_wallet():
    """
    Add coins to a user and then return said user object.
    """
    user = User.query.get(current_user.id)
    user.coins = None
    for story in user.stories:
        for chapter in story.chapters:
            chapter.cost = 0
    db.session.commit()

    query = select(purchased_chapters.c.chapter_id).where(purchased_chapters.c.user_id == current_user.id)
    results = db.session.execute(query).all()
    return_obj = user.to_dict()
    return_obj['purchased_chapters'] = {}
    for result in results:
        return_obj['purchased_chapters'][result[0]] = True

    return return_obj, 200
