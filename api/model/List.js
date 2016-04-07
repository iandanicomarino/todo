var mongoose = require('mongoose');
var Listschema = new mongoose.Schema({
  task: String,
  done: Boolean
});
var List = mongoose.model('list',Listschema,'list');
