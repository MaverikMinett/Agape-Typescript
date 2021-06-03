import os
import sys
import django

test_dir = os.path.dirname(__file__)
sys.path.insert(0, test_dir)

from django.conf import settings
from django.test.utils import get_runner


def runtests():
  os.environ['DJANGO_SETTINGS_MODULE'] = 'tests.settings'
  django.setup()


  TestRunner = get_runner(settings)
  test_runner = TestRunner()

  if len(sys.argv) > 1:
    failures = test_runner.run_tests(sys.argv[1:])
  else:
    failures = test_runner.run_tests(
      [ 
        'tests.db.tests'
      ]
    )
  sys.exit(bool(failures))

if __name__ == '__main__':
  runtests()