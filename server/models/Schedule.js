var mongoose = require('mongoose');
var slug = require('slug');
var uniqueValidator = require('mongoose-unique-validator');
var ScheduleSchema = new mongoose.Schema({
  organiser: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  slug: {type: String, lowercase: true, unique: true},
  title: {type: String, unique:true, lowercase: true, required: [true, "can't be blank"]},
  description: String,
  sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}]
}, {timestamps: true});

ScheduleSchema.plugin(uniqueValidator, {message: 'is already taken.'});

ScheduleSchema.pre('validate', function(next){
  this.slugify();

  next();
});

ScheduleSchema.methods.slugify = function() {
  this.slug = slug(this.title);
};

ScheduleSchema.methods.toJSONFor = function(user){
  return {
    title: this.title,
    slug: this.slug,
    description: this.description,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    sessions: this.sessions,
    organiser: this.organiser.toProfileJSONFor(user)
  };
};

mongoose.model('Schedule', ScheduleSchema);
