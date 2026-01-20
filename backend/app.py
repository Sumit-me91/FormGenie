from flask import Flask, jsonify
from flask_cors import CORS

# ✅ app MUST be defined BEFORE routes
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return jsonify({"status": "FormGenie backend running"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)

