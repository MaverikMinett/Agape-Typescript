
from django.test import TestCase
from .models import Foo

class SlugTestCase( TestCase ):

	def setUp( self ):

		pass

	def test_slug_on_model( self ):

		instance = Foo.objects.create( label="Walk a mile in my shoes" )

		self.assertEqual( instance.slug, 'walk-a-mile-in-my-shoes' )