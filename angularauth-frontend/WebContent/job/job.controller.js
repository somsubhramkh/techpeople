(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobController', JobController);

    JobController.$inject = ['JobService', '$rootScope','$scope','$location'];
    function JobController(JobService, $rootScope,$scope,$location) {
        var vm = this;
        vm.job=null;
        
        vm.submit=submit;
        vm.reset=reset;
        
        console.log('username in HomeController:'+$rootScope.currentUser);
        
        
        function postAJob(job){
        	
        	console.log('submit a new job', vm.job);
			JobService.postAJob(job).then(function(d) {
			alert("You successfully posted the job")
			}, function(errResponse) {
				console.error('Error while posting job.');
			});
        	
        }
        
        function submit(){
        	
        	console.log('submit a new job', vm.job);
			postAJob(vm.job);
			vm.reset();
        }

        function reset(){
        	console.log('resetting the form');
			self.user ={}; 
			
			$scope.myForm.$setPristine(); // reset Form
        }
        
    }

})();
