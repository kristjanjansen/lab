import json
import sys

print "Hello from test.py"

if sys.argv[1:]:
    print sys.argv[1]
if sys.argv[2:]:
    print sys.argv[2]
if sys.argv[3:]:
    print sys.argv[3]
if sys.argv[4:]:
    print sys.argv[4]

print json.dumps({'some': 'json'})
