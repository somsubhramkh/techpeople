(function () {
    'use strict';

    angular
        .module('app')
        .factory('JobService', JobService);

    JobService.$inject = ['$http', '$q','$rootScope'];
    function JobService($http,$q,$rootscope) {
    	var BASE_URL='http://localhost:10080/angularauth-rest';
    	
    	var service = {};
        
    	service.postAJob=postAJob;
        
        return service;
        
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
