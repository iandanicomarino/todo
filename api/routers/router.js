var express= require ('express');
var bodyparser= require ('body-parser');
var mongoose = require ('mongoose');
var settings =require ('../../config/settings.js');
var List=require ('../../api/model/List.js');

var router=express();
var router=express.Router();
router.use(bodyparser.json())

router.get('/checklist',function(req,res){
  List.find(function (err,docs) {
    res.json(docs);
  });
});

router.post('/add',function(req,res){
  req.body.done=false;
  delete req.body._id;
  delete req.body.__v;
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


router.delete('/delete/:id',function(req,res){
  console.log(req.params.id);
  List.find({_id:req.params.id}).remove().exec();
  List.find(function (err,docs) {
    res.json(docs);
  });
});
router.post('/update/:id',function(req,res){
  var id=req.params.id;
  delete req.body._id;
  delete req.body.__v;
  console.log(id);
  console.log(req.body);
  List.update({_id:id},req.body,{upsert:false},function(err, docs){
    console.log(req.body+"inserted");
  });
  List.find(function (err,docs) {
    res.json(docs);
  });
});

router.post('/edit/:id',function(req,res){
  console.log(req.params.id);
  List.findOne({_id:req.params.id},function (err,docs) {
    res.json(docs);
  });
});

router.post('/toggle/:id',function(req,res){
  console.log(req.body.done);
  delete req.body._id;
  List.update({_id:req.params.id},req.body,{upsert:true},function(err, docs){
    console.log(docs+"inserted");
  });
});
module.exports=router;
