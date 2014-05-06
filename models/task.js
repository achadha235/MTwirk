var mongoose = require('mongoose');
/* Types of task
  Image - includes an image of some kind
  Custom - link to external site/survey for task
*/

var taskSchema = mongoose.Schema({
    owner         : { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    numTasks      : {type: Number, min: 1}, // number of hits posted
    lifetime      : {type: Number, min: 0, default: 86400}, // how long the tasks is available (in seconds) (default =  1 day)
    reward        : {type: Number, min: 0, default: 0}, // base payment for one task (dollars)
    approvalDelay : {type: Number, min: 0}, // how long after task completion before worker is automatically paid
    description   : String,
    data          : mongoose.Schema.Types.Mixed,
    // task results
    results       : { type: [mongoose.Schema.Types.ObjectId], ref: 'TaskResult'}
    type          : String, // type of task
    tag           : String, // An arbitrary 4 char string thats not currently in-use
});

// description must be less than 120 chars
taskSchema.path('description').validate(function(v) {
    return (v.length <= 120);
}, 'Description is too long (max 120 chars)');

// create the model for workers and expose it to our app
module.exports = mongoose.model('Task', taskSchema);
