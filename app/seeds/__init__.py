from flask.cli import AppGroup
from .tags import seed_tags, undo_tags
from .users import seed_users, undo_users
from .stories import seed_stories, undo_stories
from .chapters import seed_chapters, undo_chapters
from .comments import seed_comments, undo_comments
from .reviews import seed_reviews, undo_reviews
from .purchased_chapters import seed_purchased_chapters, undo_purchased_chapters
from .categories import seed_categories, undo_categories
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_categories()
        undo_tags()
        undo_users()
        undo_stories()
        undo_chapters()
        undo_comments()
        undo_reviews()
        undo_purchased_chapters()
    seed_categories()
    seed_tags()
    seed_users()
    seed_stories()
    seed_chapters()
    seed_comments()
    seed_reviews()
    seed_purchased_chapters()


    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_categories()
    undo_tags()
    undo_users()
    undo_stories()
    undo_chapters()
    undo_comments()
    undo_reviews()
    undo_purchased_chapters()

    # Add other undo functions here
