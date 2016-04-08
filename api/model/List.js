var mongoose = require('mongoose');
var Listschema = mongoose.Schema({
  task: String,
  done: Boolean
});
module.exports = mongoose.model('list',Listschema,'list');
