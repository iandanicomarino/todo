//dependecies
var express= require ('express');
var bodyparser= require ('body-parser');
var mongoose = require ('mongoose');
//dependencies

//init
var settings =require ('./config/settings.js');
var mongoose = require('mongoose');
var Listschema = new mongoose.Schema({
  task: String,
  done: Boolean
});
var List = mongoose.model('list',Listschema,'list');

var app=express();
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
//init

//server actions
	//insert todo here
	app.get('/checklist',function(req,res){
		List.find(function (err,docs) {
			res.json(docs);
		});
	});

	app.post('/add',function(req,res){
		req.body.done=false;
		delete req.body._id;
		console.log(req.body);
		var newtodo=new List({
			task: req.body.task,
			done: req.body.done
		});
		newtodo.save(function (err, docs){
			if (err) return err;
			else console.log("saved"+docs);
		})
	});


	app.delete('/delete/:id',function(req,res){
		console.log(req.params.id);
		List.find({_id:req.params.id}).remove().exec();
		List.find(function (err,docs) {
			res.json(docs);
		});
	});
	app.post('/update/:id',function(req,res){
		var id=req.params.id;
		delete req.body._id;
		console.log(id);
		console.log(req.body);
		List.update({_id:id},req.body,{upsert:false},function(err, docs){
			console.log(docs+"inserted");
		});
		db.list.find(function (err,docs) {
			res.json(docs);
		});
	});

	app.post('/edit/:id',function(req,res){
		console.log(req.params.id);
		List.findOne({_id:req.params.id},function (err,docs) {
			res.json(docs);
		});
	});

	app.post('/toggle/:id',function(req,res){
		console.log(req.body.done);
		delete req.body._id;
		List.update({_id:req.params.id},req.body,{upsert:true},function(err, docs){
			console.log(docs+"inserted");
		});
	});
//server actions

//server init
app.listen(1235);
console.log("server started: port 1235")
//server init
