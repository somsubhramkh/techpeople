(function () {
    'use strict';

    angular
        .module('app')
        .factory('BlogService', BlogService);

    BlogService.$inject = ['$http', '$q','$rootScope'];
    function BlogService($http, $q,$rootScope) {
        
    	var BASE_URL='http://localhost:10080/angularauth-rest'
    	
    	var service = {};

        service.fetchAllBlogs = fetchAllBlogs;
        service.createBlog = createBlog;
        service.updateBlog = updateBlog;
        service.deleteBlog = deleteBlog;
        service.getBlog = getBlog;
        

        return service;

        
        function fetchAllBlogs() {
            return $http.get(BASE_URL+'/blog/')
                    .then(
                            function(response){
                            	
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while fetching Blogs');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        function createBlog(blog){
            return $http.post(BASE_URL+'/blog/', blog)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while creating blog');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        
        function updateBlog(blog, id){
            return $http.put(BASE_URL+'/blog/'+id, blog)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while updating blog');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        
        function deleteBlog(id){
            return $http.delete(BASE_URL+'/blog/'+id)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while deleting blog');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        
        function getBlog(id){
            return $http.get  (BASE_URL+'/blog/'+id)
                    .then(
                            function(response){
                            	$rootScope.selectedBlog = response.data
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while getting blog');
                                return $q.reject(errResponse);
                            }
                    );
    }
        
        
        
    }

})();
