(function () {
    'use strict';

    angular
        .module('app')
        .controller('JobController', JobController);

    JobController.$inject = ['JobService', '$rootScope','$scope','$location'];
    function JobController(JobService, $rootScope,$scope,$location) {
        var vm = this;
        vm.job=null;
        vm.jobs=[];
        
        vm.submit=submit;
        vm.reset=reset;
        vm.getAllJobs=getAllJobs;
        vm.getJobDetails=getJobDetails;
        vm.applyForJob=applyForJob;
        
        console.log('username in JobController:'+$rootScope.currentUser);
        
        getAllJobs();
        
        function getAllJobs(){
        	console.log('calling the method getAllJobs');
			JobService.getAllJobs()
					.then(
							function(d) {
								vm.jobs = d;
							},
							function(errResponse) {
								console.error('Error while fetching All jobs');
							});
        }
        
        function getJobDetails(jobID) {
			console.log('get Job details of the id', jobID);
			JobService.getJobDetails(jobID)
					.then(
							function(d) {
								//vm.job = d;
								
								$location.path('/jobdetails');
							},
							function(errResponse) {
								console.error('Error while fetching job details');
							});
		}
        
        function applyForJob(jobID) {
			console.log("applyForJob");
			var currentUser = $rootScope.currentUser;
			console.log("currentUser.userId:" + currentUser.userId)
			
			if (typeof currentUser.userId == 'undefined') 
				{
				   alert("Please Login to apply for the job");
                     console.log("User is not logged in.  Can't apply for job")
                     $location
						.path('/login');
				
				}
			console.log("->userID :" + currentUser.userId+ "  applying for job:" + jobID)
					
					
			JobService.applyForJob(jobID)
					.then(
							function(d) {
								vm.job = d;
								alert("You have successfully applied for job. HR will getback to you soon.")
							},
							function(errResponse) {
								console
										.error('Error while applying for job request');
							});

		}

        
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
