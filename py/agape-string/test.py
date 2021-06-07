import os
import sys

test_dir = os.path.dirname(__file__)
sys.path.insert(0, test_dir)

from agape.string import slugify, tokenize, pluralize

import unittest

class PluralizeTestCase( unittest.TestCase ):

	def setUp( self ):
		pass

	def test_typical_plural( self ):
		self.assertEqual( pluralize('chicken'), 'chickens' )

	def test_y_plural( self ):
		self.assertEqual( pluralize('city'), 'cities' )

	def test_us_plural( self ):
		self.assertEqual( pluralize('octopus'), 'octopi' )


class TokenizeTestCase( unittest.TestCase ):

	def test_tokenize_camel_case( self ):
		self.assertEqual( tokenize('CamelCase'), 'camel-case' )

	def test_tokenize_two_words( self ):
		self.assertEqual( tokenize('Two words'), 'two-words' )
		self.assertEqual( tokenize('Two Words'), 'two-words' )


class SlugifyTestCase( unittest.TestCase ):

	def test_slugify_headline( self ):

		headline = "Oh No! Aliens have landed and are taking our $ dollars (ya'll). What will we do Mr. President?"

		expect = "oh-no-aliens-have-landed-and-are-taking-our-dollars-yall-what-will-we-do-mr-president"

		self.assertEqual( slugify(headline), expect )

if __name__ == '__main__':
    unittest.main()