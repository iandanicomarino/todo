//controller
console.log("controller loaded ajax");
var myApp=angular.module('myApp',[]);

myApp.controller('AppCtrl',['$scope','$http', function($scope, $http){
	//processes
	console.log("i got data");

	var refresh = function(){
		$http.get('/checklist').then(function(res){
		$scope.checklist=res.data;
		delete $scope.list;
		});
	};

	$http.get('/checklist').then(function(res){
	$scope.checklist=res.data;
	});

	$scope.add= function ()
	{
		$http.post('/add',$scope.list);
			refresh();
	};

	$scope.del= function(id)
	{
		$http.delete('/delete/'+id).then(function (res){
			refresh();
		});
	};

	$scope.edit=function(list)
	{
		$http.post("/edit/"+list._id).then(function (res){

			console.log(res.data);
			$scope.list=res.data;
			//console.log($scope.list.task);
		});

	};

	$scope.update=function(id)
	{
		$http.post('/update/'+id,$scope.list).then(function (res){
			console.log(res.data);
			refresh();
		});
	};

	$scope.toggle=function(list){
		console.log(list.done);
		$http.post('/toggle/'+list._id,list, list).then(function (res){
			console.log(res.data);
			refresh();
		});
	};

}]);
