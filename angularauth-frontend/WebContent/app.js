(function () {
    'use strict';
console.log('inside app.js')
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'home/home.view.html',
                controllerAs: 'vm'
            })

            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.view.html',
                controllerAs: 'vm'
            })

            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'vm'
            })
            

		    .when('/createblog', {
		    	templateUrl : 'blog/createblog.view.html',
		    	controller : 'BlogController',
		    	controllerAs: 'vm'
		    })

		    .when('/listblog', {
		    	templateUrl : 'blog/listblog.view.html',
		    	controller : 'BlogController',
		    	controllerAs: 'vm'
		    })

		    .when('/viewblog', {
		    	templateUrl : 'blog/showblog.view.html',
		    	controller : 'BlogController',
		    	controllerAs: 'vm'
		    })
		    
		    .when('/postjob', {
		    	templateUrl : 'job/postjob.view.html',
		    	controller : 'JobController',
		    	controllerAs: 'vm'
		    })
		    
		    .when('/searchjob', {
		    	templateUrl : 'job/searchjob.view.html',
		    	controller : 'JobController',
		    	controllerAs: 'vm'
		    })
		    
		    .when('/jobdetails', {
		    	templateUrl : 'job/jobdetails.view.html',
		    	controller : 'JobController',
		    	controllerAs: 'vm'
		    })
		    
		    .when('/chat', {
		    	templateUrl : 'chat/chat.view.html',
		    	controller : 'ChatController',
		    	
		    })
		    
		    .when('/privatechat', {
		    	templateUrl : 'privatechat/privatechat.view.html',
		    	controller : 'PrivateChatController',
		    	
		    })
		    
		    .when('/searchfriend', {
		    	templateUrl : 'friend/searchfriend.view.html',
		    	controller : 'FriendController',
		    	controllerAs:'vm'
		    })

		    .when('/viewfriend', {
		    	templateUrl : 'friend/viewfriend.view.html',
		    	controller : 'FriendController',
		    	controllerAs:'vm'
		    })
		    
		    .when('/friendrequest', {
		    	templateUrl : 'friend/friendrequest.view.html',
		    	controller : 'FriendController',
		    	controllerAs:'vm'
		    })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        // keep user logged in after page refresh
        $rootScope.currentUser = $cookies.getObject('currentUser') || {};
        console.log('7'+$rootScope.currentUser.username);
        if ($rootScope.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser.username;
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/viewblog','/listblog','/chat']) === -1;
            var adminPage = $.inArray($location.path(), ['/postjob']) == 0;
            console.log('Restricted Page:'+restrictedPage);
            
            var loggedIn = $rootScope.currentUser.username;
            var role=$rootScope.currentUser.role;
            console.log('logged In:'+loggedIn);
            console.log('role:'+role);
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            else
            {
            	
            	if (adminPage && role!='admin') {
                    alert('This action is restricted to the admin role only');
                    $location.path("/");
                }
            }
            
            
        });
    }

})();
