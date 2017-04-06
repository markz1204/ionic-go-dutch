var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var MemberCostSchema = new mongoose.Schema({
  session: {type: mongoose.Schema.Types.ObjectId, ref:'Session'},
  member: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  costAmount: Number
}, {timestamps: true});

MemberCostSchema.plugin(uniqueValidator, {message: 'is already taken.'});

MemberCostSchema.index({session: 1, member:1}, {unique: true});


MemberCostSchema.methods.toJSONForDetails = function(){
  return {
    member: this.member.toProfileJSON(),
    session: this.session.toJSONForDetails(),
    costAmount: this.costAmount
  };
};

mongoose.model('MemberCost', MemberCostSchema);
