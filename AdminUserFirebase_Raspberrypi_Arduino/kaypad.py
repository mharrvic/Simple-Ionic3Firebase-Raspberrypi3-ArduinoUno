import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

MATRIX = [['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['*', '0', '#']]

ROW = [15,22,27,24]
COL = [23,14,8]

for j in range(3):
    GPIO.setup(COL[j], GPIO.OUT)
    GPIO.output(COL[j], 1)

for i in range(4):
    GPIO.setup(ROW[i], GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.setup(21,GPIO.OUT)
GPIO.output(21,GPIO.HIGH)
password = "1234*"
attempt = ""
try:
    while (True):
        for j in range(3):
            GPIO.output(COL[j], 0)

            for i in range(4):
                if GPIO.input(ROW[i]) == 0:
                    time.sleep(0.01)
                    while (GPIO.input(ROW[i]) == 0):
                        pass
                    attempt += MATRIX[i][j]
                    if len(attempt) == len(password):
                        if attempt == password:
                            print "Password OK"
                            GPIO.setup(16,GPIO.OUT)
                            GPIO.output(16,GPIO.HIGH)
                            GPIO.setup(21,GPIO.OUT)
                            GPIO.output(21,GPIO.HIGH)
                            GPIO.setup(21,GPIO.IN)
                            time.sleep(1)
                            GPIO.setup(16,GPIO.IN)
                            time.sleep(2)
                            GPIO.setup(21,GPIO.OUT)
                            GPIO.output(21,GPIO.HIGH)

                            # This is where you unlock the door.
                            #
                        else:
                            print "Password incorrect"
                            GPIO.setup(20,GPIO.OUT)
                            GPIO.output(20,GPIO.HIGH)
                            time.sleep(1)
                            GPIO.setup(20,GPIO.IN)
                        attempt = ""
            time.sleep(0.01)

            GPIO.output(COL[j], 1)
except KeyboardInterrupt:
    GPIO.cleanup()
