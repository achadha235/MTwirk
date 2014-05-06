var mongoose = require('mongoose');

/* Types of task
  Short answer - includes questions and responses
  Image - includes an image of some kind
  Custom - link to external site/survey for task
*/

var taskResultSchema = mongoose.Schema({
	owner         : { type: mongoose.Schema.Types.ObjectId, ref:'User' },
    tag           : String, // An arbitrary 4 char string thats not currently in-use
    data          : String,
    worker        : String,
});
// create the model for workers and expose it to our app
module.exports = mongoose.model('TaskResult', taskResultSchema);
