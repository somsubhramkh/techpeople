(function () {
    'use strict';

    angular
        .module('app')
        .factory('JobService', JobService);

    JobService.$inject = ['$http', '$q','$rootScope'];
    function JobService($http,$q,$rootScope) {
    	var BASE_URL='http://localhost:10080/angularauth-rest';
    	
    	var service = {};
        
    	service.postAJob=postAJob;
    	service.getAllJobs=getAllJobs;
    	service.getJobDetails=getJobDetails;
    	service.applyForJob=applyForJob;
        
        return service;
        
        function getAllJobs(){
            return $http.get(BASE_URL+'/job/')
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while getting all jobs');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        
        function getJobDetails(jobID) {
        	console.log("Getting job details of " + jobID)
            return $http.get(BASE_URL+"/job/" + jobID)
                    .then(
                            function(response){
                            	console.log('Job details:'+response.data.title);
                            	try{
                            	$rootScope.selectedJob = response.data;
                            	console.log($rootScope.selectedJob.jobId+'   '+$rootScope.selectedJob.title);
                            	}catch(err){
                            		console.error(err.message);
                            	}
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while getting job details');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        function applyForJob(jobID) {
            return $http.post(BASE_URL+"/applyForJob/"+jobID)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while applying for job');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        function postAJob(job){
        	return $http.post(BASE_URL+'/job/', job)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while posting job');
                        return $q.reject(errResponse);
                    }
            );
        }
        
    }

})();
