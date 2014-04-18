var mongoose = require('mongoose');

/* Types of task
  Image - includes an image of some kind
  Custom - link to external site/survey for task
*/

var taskSchema = mongoose.Schema({
  numTasks      : {type: Number, min: 1}, // number of hits posted
  numAssign     : {type: Number, min: 1}, // number of tasks one user can do
  lifetime      : {type: Number, min: 0}, // how long the tasks is available (in seconds)
  reward        : {type: Number, min: 0}, // base payment for one task (dollars)
  duration      : {type: Number, min: 0, default: 300}, // how long a worker will be able to work on a single task (seconds)
  approvalDelay : {type: Number, min: 0}, // how long after task completion before worker is automatically paid
  description   :  String,
  keywords      : [String],
  data          : mongoose.Schema.Types.Mixed,
  type          : String // type of task
});

// description must be less than 120 chars
taskSchema.path('description').validate(function(v) {
  return v.length <= 120;
}, 'Description is too long (max 120 chars)');

// max of 3 keywords per task
taskSchema.path('keywords').validate(function(words) {
  return words.length <= 3;
}, 'Too many keywords (max 3)');

// create the model for workers and expose it to our app
module.exports = mongoose.model('Task', taskSchema);
