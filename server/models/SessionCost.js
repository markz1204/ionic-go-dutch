var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var SessionCostSchema = new mongoose.Schema({
  session: {type: mongoose.Schema.Types.ObjectId, ref:'Session'},
  costType: Number,
  costAmount: Number
}, {timestamps: true});

SessionCostSchema.plugin(uniqueValidator, {message: 'is already taken.'});


SessionCostSchema.methods.toJSONFor = function(user){
  return {
    costType: this.costType,
    costAmount: this.costAmount,
    session: this.session.toJSONFor(user)
  };
};

mongoose.model('Session', SessionCostSchema);
