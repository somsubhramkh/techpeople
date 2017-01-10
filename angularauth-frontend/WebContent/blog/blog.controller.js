/*(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['$scope', 'BlogService','$location','$rootScope'];
    function BlogController($scope, BlogService,$location,$routeParams,$rootScope) {
        var vm = this;
        
        console.log('username:'+$rootScope.currentUser);
        vm.blog = null;
        vm.allBlogs = [];
        vm.getBlog = getBlog;
        vm.fetchAllBlogs = fetchAllBlogs;
        vm.createBlog = createBlog;
        vm.updateBlog = updateBlog;
        vm.submit = submit;
        vm.edit = edit;
        vm.remove = remove;
        vm.reset=reset;
        
        vm.fetchAllBlogs();
        
        function getBlog(id){
      	  console.log("->getting blog :"+id)
            BlogService.getBlog(id)
                .then(
                             function(d) {
                                 // vm.blog = d;
                                   $location.path('/viewblog'); //mapping is there in the app.js .when
                             },
                              function(errResponse){
                                  console.error('Error while fetching Blogs');
                              }
                     );
        };
        
        
        function fetchAllBlogs(){
            BlogService.fetchAllBlogs()
                .then(
                             function(d) {
                            	 console.log('inside fetch function')
                                  vm.allBlogs = d;
                                  console.log(vm.allBlogs)
                             },
                              function(errResponse){
                                  console.error('Error while fetching Blogs');
                              }
                     );
        };
        
        
        function createBlog(blog){
            BlogService.createBlog(blog)
                    .then(
                    vm.fetchAllBlogs, 
                            function(errResponse){
                                 console.error('Error while creating Blog.');
                            } 
                );
        };
        
        function updateBlog(blog, id){
            BlogService.updateBlog(blog, id)
                    .then(
                            vm.fetchAllBlogs, 
                            function(errResponse){
                                 console.error('Error while updating Blog.');
                            } 
                );
        };

        
        function submit() {
            
            console.log('Saving New Blog', vm.blog);
            console.log($rootScope.currentUser.username);
            vm.blog.user=$rootScope.currentUser;
            vm.createBlog(vm.blog);
      
        vm.reset();
    };
         
    function edit(id){
        console.log('id to be edited', id);
        for(var i = 0; i < vm.allBlogs.length; i++){
            if(vm.allBlogs[i].id === id) {
               vm.blog = angular.copy(vm.allBlogs[i]);
               break;
            }
        }
    };
         
    function remove(id){
        console.log('id to be deleted', id);
        if(vm.blog.id === id) {//clean form if the blog to be deleted is shown there.
           vm.reset();
        }
        vm.deleteBlog(id);
    };

     
    function reset(){
  	   vm.blog={};
         $scope.myForm.$setPristine(); //reset Form
    };
    }

})();
*/

(function () {
    'use strict';

    angular
        .module('app')
        .controller('BlogController', BlogController);

    BlogController.$inject = ['BlogService', '$rootScope','$scope','$location'];
    function BlogController(BlogService, $rootScope,$scope,$location) {
        var vm = this;
        console.log('username in BlogController:'+$rootScope.currentUser.username);
        vm.blog = null;
        vm.allBlogs = [];
        
        vm.fetchAllBlogs = fetchAllBlogs;
        vm.getBlog = getBlog;
        vm.submit=submit;
        vm.reset=reset;
        fetchAllBlogs();
        
        function fetchAllBlogs(){
            BlogService.fetchAllBlogs()
                .then(
                             function(d) {
                            	 console.log('inside fetch function')
                                  vm.allBlogs = d;
                                  console.log(vm.allBlogs)
                             },
                              function(errResponse){
                                  console.error('Error while fetching Blogs');
                              }
                     );
        };
        
        function getBlog(id){
        	  console.log("->getting blog :"+id)
              BlogService.getBlog(id)
                  .then(
                               function() {
                                    //vm.blog = d;
                                    //console.log('blog details:'+vm.blog.title);
                                   try{  
                            	   $location.path('/viewblog'); //mapping is there in the app.js .when
                                   }catch(err)
                                   {
                                	   console.log(err);
                                   }
                               },
                                function(errResponse){
                                    console.error('Error while fetching Blogs');
                                }
                       );
          };
          
          
          function createBlog(blog){
              BlogService.createBlog(blog)
                      .then(
                      vm.fetchAllBlogs, 
                              function(errResponse){
                                   console.error('Error while creating Blog.');
                              } 
                  );
          };
          
          function submit() {
              
              console.log('Saving New Blog', vm.blog);
              console.log($rootScope.currentUser.username);
              vm.blog.user=$rootScope.currentUser;
              createBlog(vm.blog);
        
          vm.reset();
      };
      
      function reset(){
     	   vm.blog={};
            $scope.myForm.$setPristine(); //reset Form
       };
    }

})();
