

from django.db.models import Model
from agape import db

from agape.db import string


class Foo( Model ):

	active = db.boolean()

	label = db.string( 32 )

	slug  = db.slug( label )


