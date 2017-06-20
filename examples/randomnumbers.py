import sys
from time import sleep
from sys import stdout
from random import random

for i in range(5):
    print random()
    #print '{"Yo":"Ya"}'
    sys.stdout.flush()
    sleep(1)