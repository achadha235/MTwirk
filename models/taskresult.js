var mongoose = require('mongoose');

/* Types of task
  Image - includes an image of some kind
  Custom - link to external site/survey for task
*/

var taskResultSchema = mongoose.Schema({
    valid         : Boolean,
    tag           : String, // An arbitrary 4 char string thats not currently in-use
    data          : mongoose.Schema.Types.Mixed
});
// create the model for workers and expose it to our app
module.exports = mongoose.model('TaskResult', taskResultSchema);


