import jwt
import datetime
from flask import Blueprint, render_template, redirect, url_for, request, jsonify
from db.models.user import User
#from Api.__init__ import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, set_access_cookies, unset_access_cookies, unset_jwt_cookies
#from . import app as auth

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/login', methods=['POST'])
def login():
    msg = {'message': "", "valid": False}
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.id, fresh=datetime.timedelta(minutes=60))
        msg.update({"message": "Logged in successfully", 
               "valid":True, "token":token})
        response = jsonify(msg)
        set_access_cookies(response, token)
        return response, 200
    msg.update({'message': "Invalid credentials"})
    return jsonify(msg), 401
    
        
@auth_bp.route('/logout', methods=['POST', 'GET'])
def logout():
    response = jsonify({"message": "Logged out successfully", "valid": True})
    #unset_access_cookies(response)
    unset_jwt_cookies(response)
    return response, 200