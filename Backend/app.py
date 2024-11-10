from flask import Flask, request, redirect, url_for, make_response, jsonify
from pymongo import MongoClient
import hashlib

app = Flask(__name__)
client = MongoClient("localhost", 27017)

db = client.InternInn_test_db
user_collections = db.user

@app.route("/")
def home():
    return "<h1>This is api landing page</h1>"

@app.route("/api/signup", methods=["POST"])
def signup():
    received_data = request.get_json(force=True)
    print(received_data.keys())
    users = user_collections.find({}, {"email": 1, "phone": 1})
    for user in users:
        if received_data["email"] == user["email"] or received_data["phone"] == user["phone"]:
            return make_response(jsonify({"status": False, "message": "Email/Phone is already associated with an account"}))
        
    user_collections.insert_one({
        "full_name": received_data["full_name"],
        "year": received_data["year"],
        "age": received_data["age"],
        "phone": received_data["phone"],
        "email": received_data["email"],
        "password": hashlib.sha256(received_data["password"].encode()).hexdigest()
    })

    return make_response(jsonify({"status": True, "message": "Sign up success"}))

@app.route("/api/login", methods=["POST"])
def login():
    received_data = request.get_json(force=True)
    print(received_data)
    users = user_collections.find({}, {"full_name": 1, "year": 1, "age": 1, "phone": 1, "email": 1, "password": 1})

    pass_ = False
    found_user = users[0]

    for user in users:
        if received_data["email"] == user["email"] and hashlib.sha256(received_data["password"].encode()).hexdigest() == user["password"]:
            pass_ = True
            found_user = user
            break
    
    if pass_ == False:
        return make_response(jsonify({"status": False, "message": "Invalid credential"}))
    else:
        return make_response(jsonify({"status": True, "data": {"full_name": found_user["full_name"], "year": found_user["year"],"age": found_user["age"],"phone": found_user["phone"],"email": found_user["email"]}}))

if __name__=="__main__":
    app.run(host = "localhost", port = 5000, debug = True)