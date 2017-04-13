var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var UserSchema = new mongoose.Schema({
  email: {type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  picture: String,
  firstName: String,
  lastName: String,
  sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session', unique:true}]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.toProfileJSON = function(){
  return {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    picture: this.picture
  };
};

UserSchema.methods.toAuthJSON = function(token){
  return {
    id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    picture: this.picture,
    token: token
  };
};

mongoose.model('User', UserSchema);
