var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');
var User = mongoose.model('User');

var SessionSchema = new mongoose.Schema({
  organiser: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  costType: Number,
  description: String,
  title: {type: String, lowercase: true, required: [true, "can't be blank"], index: true},
  slug: {type: String, lowercase: true},
  startTime: Date,
  endTime: Date,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User', unique:true}]
}, {timestamps: true});

SessionSchema.plugin(uniqueValidator, {message: 'is already taken.'});

SessionSchema.pre('validate', function(next){
  this.slugify();

  next();
});

SessionSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

SessionSchema.methods.toJSONForCreation = function(){
  return {
    organiser: this.organiser.toProfileJSON(),
    title: this.title,
    slug: this.slug,
    startTime: this.startTime,
    endTime: this.endTime
  };
};

SessionSchema.methods.toJSONForDetails = function(){
  return {
    organiser: this.organiser.toProfileJSON(),
    title: this.title,
    slug: this.slug,
    startTime: this.startTime,
    endTime: this.endTime,
    members: this.members.map(function(member){
      return member.toProfileJSON();
    })
  };
};

mongoose.model('Session', SessionSchema);
