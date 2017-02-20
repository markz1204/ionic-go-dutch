var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var SessionSchema = new mongoose.Schema({
  organiser: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  description: String,
  title: {type: String, lowercase: true, required: [true, "can't be blank"], index: true},
  startTime: Date,
  endTime: Date,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  costExcluded: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

SessionSchema.plugin(uniqueValidator, {message: 'is already taken.'});


SessionSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    startTime: this.startTime,
    endTime: this.endTime,
    members: this.members,
    organiser: this.organiser.toProfileJSONFor(user)
  };
};

mongoose.model('Session', SessionSchema);
