import os
import json

# Load user data
file_path = os.path.join(os.path.dirname(__file__), "user_data.json")
if os.path.exists(file_path):
    with open(file_path, "r") as f:
        users = json.load(f)
else:
    users = {}

# ---------- HTML ROUTES ----------
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    if request.method == "POST":
        username = request.form["username"]
        user_data = {
            "name": request.form["name"],
            "dob": request.form["dob"],
            "email": request.form["email"],
            "phone": request.form["phone"],
            "address": request.form["address"],
            "education": request.form["education"]
        }
        users[username] = user_data

        # Save back to JSON
        with open(file_path, "w") as f:
            json.dump(users, f, indent=2)

        return redirect(url_for("success", username=username))

    return render_template("register.html")

@app.route("/success")
def success():
    username = request.args.get("username")
    return render_template("success.html", username=username)

@app.route("/userpage/<username>")
def user_page(username):
    user = users.get(username)
    if not user:
        return render_template("user.html", error="User not found")
    return render_template("user.html", user=user)

# ---------- API ROUTES ----------
@app.route("/api/user/<username>")
def get_user(username):
    user = users.get(username)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)

if __name__ == "__main__":
    app.run(debug=True)
