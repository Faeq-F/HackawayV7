from flask import Flask
from flask import request
from flask import render_template
import sys
import os


app = Flask(__name__)

@app.route('/')
def my_form():
    return render_template("home.html")

@app.route('/', methods=['POST'])
def my_form_post():
    print("Run the game now!")
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
