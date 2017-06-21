import sys
from time import sleep
from sys import stdout
from random import random

for i in range(5):
    print random()
    sys.stdout.flush()
    sleep(1)