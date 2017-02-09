var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var SessionSchema = new mongoose.Schema({
  name: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  startTime: Date,
  endTime: Date,
  members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
  costExcluded: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true});

SessionSchema.plugin(uniqueValidator, {message: 'is already taken.'});
