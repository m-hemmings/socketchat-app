from flask import Flask, render_template
import gradio as gr

app = Flask(__name__)

def greet(name):
    return f"Hello, {name}!"

@app.route('/')
def index():
    iface = gr.Interface(fn=greet, inputs="text", outputs="text", title="Greeting App", server_name="My App")
    return render_template("interface.html", gradio_interface=iface)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
