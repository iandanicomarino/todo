//dependecies
var express= require ('express');
var bodyparser= require ('body-parser');
var mongojs = require ('mongojs');
//dependencies

//init
var db=mongojs('checklist',['list']);
var app=express();
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
//init

//server actions
	//insert todo here
	app.get('/checklist',function(req,ress){
		db.list.find(function (err,docs) {
			ress.json(docs);
		});
	});

	app.post('/add',function(req,res){
		req.body.done=false;
		delete req.body._id;
		console.log(req.body);
		db.list.insert(req.body);
		db.list.find(function (err,docs) {
			res.json(docs);
		});

	});

	app.delete('/delete/:id',function(req,res){
		console.log(req.params.id);
		db.list.remove({_id:mongojs.ObjectId(req.params.id)});
		db.list.find(function (err,docs) {
			res.json(docs);
		});		
	});
	app.post('/update/:id',function(req,res){
		var id=req.params.id;
		delete req.body._id;
		console.log(id);
		db.list.update({_id:mongojs.ObjectId(id)},req.body,{upsert:true});
		db.list.find(function (err,docs) {
			res.json(docs);
		});
	});

	app.post('/edit/:id',function(req,res){
		console.log(req.params.id);
		db.list.findOne({_id:mongojs.ObjectId(req.params.id)},function (err,docs) {
			res.json(docs);
		});
	});

	app.post('/toggle/:id',function(req,res){
		console.log(req.body.done);
		delete req.body._id;
		db.list.update({_id:mongojs.ObjectId(req.params.id)},req.body,{upsert:true});
	});
//server actions

//server init
app.listen(1235);
console.log("server started: port 1235")
//server init