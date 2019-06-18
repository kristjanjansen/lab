import sys
from time import sleep
from sys import stdout
from random import random

for i in range(15):
    print random()
    sys.stdout.flush()
    sleep(1)