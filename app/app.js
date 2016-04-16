'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
   'ui.bootstrap',
   'ngAnimate',
   'chart.js',
   'ngFileUpload',
   'ngProgress'
]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/studentattendance',{
          templateUrl:'templates/studentattendance.html',
          controller:'StudentAttendanceCtrl'
	})
	$routeProvider.when('/uploadassignment',{
		templateUrl:'templates/uploadassignment.html',
		controller:'UploadAssignmentCtrl'
	})
	$routeProvider.when('/updatemarks',{
		templateUrl:'templates/updatemarks.html',
		controller:'UpdateMarksCtrl'
	})
	$routeProvider.when('/viewmarks',{
		templateUrl:'templates/viewmarks.html',
		controller:'ViewMarksCtrl'
	})
	$routeProvider.when('/updateattendance',{
		templateUrl:'templates/updateattendance.html',
		controller:'UpdateAttendanceCtrl'
	})
  $routeProvider.when('/',{
    templateUrl:'templates/loginpage.html',
    controller:'ModalDemoCtrl'
  })
  $routeProvider.when('/home',{
    templateUrl:'templates/home.html',
    controller:'HomeCtrl'
  })
  $routeProvider.when('/hometest',{
    templateUrl:'templates/hometest.html',
    controller:'HomeCtrl'
  })
  $routeProvider.when('/student-profile',{
    templateUrl:'templates/studentprofile.html',
    controller:'StudentProfileCtrl'
  })
  $routeProvider.otherwise({redirectTo: '/hometest'});

}])
.controller('StudentAttendanceCtrl',function($scope){
    

    
})
.controller('StudentProfileCtrl',function($scope,$http,ngProgressFactory){
    
$scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Before IA 1', 'Before IA 2'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.labels1 = ["Before IA 1", "Before IA 2", "Before IA 3"];
  

  $scope.assignments = [{
    assignmentname:'OOMD A1',
    status:true
  },
  {
    assignmentname:'JAVA A1',
    status:true
  },
  {
    assignmentname:'ECS A1',
    status:true
  }
  ];
  $scope.student={};

  $scope.getstudentdetails = function(){
    $scope.progressbar = ngProgressFactory.createInstance();
    $scope.progressbar.setParent(document.getElementById('student-jumbotron'));
   $scope.progressbar.setColor('#4183D7');
              $scope.progressbar.start();
    //window.localStorage.student = $scope.student.usn;
     $http.get('http://localhost:80/student_details.php?usn='+$scope.student.inputusn+'&subject_code=10cs71')
             .then(function(result){

               console.log(result.data);
              $scope.studententered=true;
              $scope.student = result.data[0];
              $scope.data1 = [$scope.student.attendance, 50, 80];
              $scope.student.average=(parseInt($scope.student.ia1) + parseInt($scope.student.ia2) + parseInt($scope.student.ia3))/3.0;
              //window.localStorage.student = JSON.stringify(result.data[0]);
             $scope.progressbar.complete();
        });
  }
    
})
.controller('HomeCtrl',function($scope,$location){
  $scope.labels = ["January", "February", "March", "April", "May", "June", "July"];
  $scope.series = ['Before IA 1', 'Before IA 2'];
  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 90]
  ];
  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
  $scope.labels1 = ["Classes till date", "Before IA 2", "Total Classes"];
  $scope.data1 = [20,0,52];


    $scope.user={};
    $scope.user.name = JSON.parse(window.localStorage.account).name;

    $scope.studentdetails = function(){
               $location.path('/student-profile');
    }
    $scope.viewmarks = function(){
           $location.path('/viewmarks');
    }
    $scope.attendance = function(){
        $location.path('/updateattendance');
    }
    $scope.uploadassignment = function(){
      $location.path('/uploadassignment');
    }


    
})
.controller('ViewMarksCtrl',function($scope,$http,$location,ngProgressFactory){
  $scope.progressbar = ngProgressFactory.createInstance();
   $scope.progressbar.setColor('#4183D7');
              $scope.progressbar.start();
   $http.get('http://localhost:80/getmarks.php?subject_code=10cs71')
          .then(function(result){
               //console.log(result.data);
               
             
               $scope.usn_list = result.data;
               console.log($scope.usn_list[0].name);
               $scope.progressbar.complete();
               
          });
          
$location.path('/viewmarks');
           

})
.controller('UpdateMarksCtrl',function($scope){

})
.controller('UploadAssignmentCtrl',function($scope){
          
})
.controller('UpdateAttendanceCtrl',function($scope,$http,ngProgressFactory){
	  $scope.usn_list = {};
    $scope.progressbar = ngProgressFactory.createInstance();
   $scope.progressbar.setColor('#4183D7');
              $scope.progressbar.start();
        $http.get('http://localhost:80/getusn.php?subject_code=10cs71')
          .then(function(result){
          	   console.log(result.data);
          	   
               $scope.usn_list = result.data;
               console.log($scope.usn_list[0].name);
                $scope.progressbar.complete();
          });
   $scope.usnselected = function()
   {
   	   var option = confirm("Are you sure you want to submit?");
   	   console.log(option);
   	   $scope.selected_usn = [];
   	   var k=0;
   	   
   	  for(var index = 0;index<$scope.usn_list.length;index++)
   	  {
   	  	if(document.getElementById($scope.usn_list[index].usn).checked)
              $scope.selected_usn[k++]= $scope.usn_list[index].usn;
   	  }
   	  console.log(JSON.stringify($scope.selected_usn));
   	  if(option)
   	  {
   	  $http.get('http://localhost:80/update_attendance.php?usn_list='+JSON.stringify($scope.selected_usn))
          .then(function(result){
          	   //console.log(result.data);
          	   console.log(result);
          });
      }
      else
      {

      }
   }
})
.controller('ModalDemoCtrl', function ($scope,$location, $uibModal, $log) {
  

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: 'sm',
      scope:$scope,
      resolve: {
        items: function () {
          return $scope.items;
        },
         email:function(){
          return $scope.email;
         },
         password:function(){
          return $scope.password;
         }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})
.controller('ModalInstanceCtrl', function (ngProgressFactory,$http,$scope,password, $uibModalInstance,email, items,$location) {


   $scope.email = email;
   $scope.password=password;
   

  $scope.ok = function () {
     $scope.progressbar = ngProgressFactory.createInstance();
              $scope.progressbar.setColor('#4183D7');
              $scope.progressbar.start();
    $http.get('http://localhost:80/loginfacultyaccount.php?email='+$scope.email+'&password='+$scope.password)
      .then(function(result){
            console.log(result.data);
             if(result.data[0]=="Invalid account"){
                $scope.invalidaccountalert=true;
               //alert("Invalid account");
               $scope.progressbar.reset();
             }
             else
             {
              window.localStorage.account= JSON.stringify(result.data[0]);
              console.log(window.localStorage.account);
              $scope.progressbar.reset();
              $location.path('/hometest');
    $uibModalInstance.close($scope.email);
             }
      });
    //console.log(window.localStorage.account);
    
   
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
})





.controller('ModalAssignmentCtrl', function ($scope,$http, $uibModal, $log,Upload,$location) {

  $scope.items = ['item1', 'item2', 'item3'];

  $scope.animationsEnabled = true;
   
  $scope.open = function (size) {
     console.log($scope.inputfile);
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalAssignment.html',
      controller: 'ModalInstanceCtrl2',
      size: 'sm',
      resolve: {
        inputfile: function () {
          return $scope.inputfile;
        },
        assignment_name:function(){
          return $scope.assignment_name;
        }
      }
    });
    $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];
      Upload.upload({
        url: '/templates',
        file: $file,
        progress: function(e){}
      }).then(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
      }); 
    }
  }

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})
.controller('ModalInstanceCtrl2', function ($scope,$http, $uibModalInstance,inputfile,$location) {

  $scope.uploadFile = function(files,assignment_name,num_of_questions) {
   var fd = new FormData();
   $scope.assignment_name=assignment_name;
   //Take the first selected file
   fd.append("assignment", files[0]);
   fd.append("assignment_name",assignment_name);
   fd.append("num_of_questions",num_of_questions);
   console.log(num_of_questions);

   $http.post('http://dscelib.comeze.com/upload_assignment.php', fd, {
       withCredentials: true,
       headers: {'Content-type':undefined},
       transformRequest: angular.identity
   }).success(function(result){
              //console.log(result.data);
              $uibModalInstance.dismiss('cancel');
              $location.path('/hometest');
              console.log(result);
         });

};
$scope.inputfile=inputfile;
  $scope.ok = function () {
    console.dir(inputfile);
    $location.path('/hometest');
     $uibModalInstance.close($scope.inputfile);
  };

  $scope.cancel = function () {

    $uibModalInstance.dismiss('cancel');
    $location.path('/hometest');
  };
})
