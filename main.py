from flask import Flask
from flask import request
from flask import render_template
import sys
import os
from PIL import Image
from itertools import product
from pathlib import Path
import os
from tkinter import Tk, Button, messagebox
import cv2
import numpy
import math

def tile(filename, dir_in, dir_out, d):
    name, ext = os.path.splitext(filename)
    img = Image.open(os.path.join(dir_in, filename))
    w, h = img.size

    grid = product(range(0, h-h%d, d), range(0, w-w%d, d))
    for i, j in grid:
        box = (j, i, j+d, i+d)
        out = os.path.join(dir_out, f'{name}_{i}_{j}{ext}')
        img.crop(box).save(out)

def runGame():
    tile("R.jpg", "./", "./", 40)
    files = []

    for file in os.listdir("./"):
        if file.endswith(".jpg") and file.startswith("R_"):
            files.append(file)

    #BGR
    #Colors middleware
    colors = set()

    #the window
    root = Tk()

    rowNum = 0
    columnNum = 0

    for i in range(len(files) - 1):
    #myimg = cv2.imread(files[i])
    #avg_color_per_row = numpy.average(myimg, axis=0)
    #avg_color = numpy.average(avg_color_per_row, axis=0)
    #TwodArr = avg_color.tolist()
    #for i in range(len(TwodArr)):
    #    TwodArr[i] = int(math.ceil(round(TwodArr[i]) / 10.0)) * 50
    #colors.add(frozenset(TwodArr))
        def tileClick(color):
            messagebox.Message(root, message="The color to fill in here is "+color, icon="info").show()
        Button(root, text = files[i], bd = '5', command = tileClick(files[i]), width="20").grid(row=rowNum, column=columnNum)
        columnNum +=1
        if i % 11 == 0:
            columnNum = 0
            rowNum+=1

    for i in range(len(colors)-1):
        Button(root, text = "Color "+str(i), bd = '5', command = root.destroy, width="20").grid(row=rowNum+5, column=i)
    root.mainloop()





app = Flask(__name__)

@app.route('/')
def my_form():
    return render_template("home.html")

@app.route('/', methods=['POST'])
def my_form_post():
    print("Running the game now!")
    runGame()
    return "<h1>Please see the game window!</h1>"

if __name__ == '__main__':
    url = "http://localhost:5000"
    if sys.platform.startswith('win'):
        os.startfile(url)
    elif sys.platform=='darwin':
        subprocess.Popen(['open', url])
    else:
        try:
            subprocess.Popen(['xdg-open', url])
        except OSError:
            print ('Please open a browser on: '+url)
    app.run()
