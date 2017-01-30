(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope','$location'];
    function HomeController(UserService, $rootScope,$location) {
        var vm = this;
        console.log('username in HomeController:'+$rootScope.currentUser);
        vm.user = null;
        vm.allUsers = [];
        vm.deleteUser = deleteUser;
        vm.logout=logout;
        
        initController();

        function initController() {
            loadCurrentUser();
            loadAllUsers();
        }

        function loadCurrentUser() {
        	console.log('inside loadCurrentUser function:'+$rootScope.currentUser.username)
            UserService.GetByUsername($rootScope.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
        
        function logout(id) {
            UserService.Logout(id)
            .then(function () {
                $location.path("/login");
            });
        }
    }

})();
