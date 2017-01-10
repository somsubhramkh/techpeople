(function () {
    'use strict';
    console.log('inside authentication service')
    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService'];
    function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService) {
        var service = {};

        service.Login = Login;
        service.SetCredentials = SetCredentials;
        service.ClearCredentials = ClearCredentials;

        return service;

        function Login(username, password, callback) {

           console.log('inside Login method inside service')
            $http.post('http://localhost:10080/angularauth-rest/user/authenticate', { username: username, password: password })
                .then(function (res) {
                	$rootScope.currentUser={ userId: res.data.userId,
          				  firstName: res.data.firstName,
          				  lastName: res.data.lastName,
          				  username: res.data.username,
          				  password: res.data.password};
                	var response={success:true};
                    callback(response);
                });

        }

        function SetCredentials(username, password) {
            
        	console.log('inside setcredentials method');
        	/*$http.get('http://localhost:10080/angularauth-rest/user/username/' + username).then(function(res){
        		
        		$rootScope.currentUser={ userId: res.data.userId,
        				  firstName: res.data.firstName,
        				  lastName: res.data.lastName,
        				  username: res.data.username,
        				  password: res.data.password};
        		console.log($rootScope.currentUser.username);
        		//$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser.username;
                console.log($rootScope.currentUser);
                console.log('1');
                // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
                var cookieExp = new Date();
                console.log('2');
                cookieExp.setDate(cookieExp.getDate() + 7);
                console.log('3');
                $cookies.putObject('currentUser', $rootScope.currentUser, { expires: cookieExp });
                console.log($cookies.getObject('currentUser'));
        	}, function(error){
        		return { success: false, message: error };
        	});*/
            /*$rootScope.currentUser = {
                    username: username,
                    password: password
                
            };*/

            // set default auth header for http requests
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.currentUser;
            console.log($rootScope.currentUser.username);
            console.log('1');
            // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
            var cookieExp = new Date();
            console.log('2');
            cookieExp.setDate(cookieExp.getDate() + 7);
            console.log('3');
            $cookies.putObject('currentUser', $rootScope.currentUser, { expires: cookieExp });
            console.log('4');
        }

        function ClearCredentials() {
            $rootScope.currentUser = {};
            $cookies.remove('currentUser');
            $http.defaults.headers.common.Authorization = 'Basic';
        }
    }


})();
