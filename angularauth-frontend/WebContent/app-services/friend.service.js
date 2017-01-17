(function () {
    'use strict';

    angular
        .module('app')
        .factory('FriendService', FriendService);

    FriendService.$inject = ['$http', '$q','$rootScope'];
    function FriendService($http, $q,$rootScope) {
        var service = {};
        var BASE_URL='http://localhost:10080/angularauth-rest';
        service.getMyFriends=getMyFriends;
        service.sendFriendRequest=sendFriendRequest;
        service.updateFriendRequest=updateFriendRequest;
        service.deleteFriend=deleteFriend;
        service.getMyFriendRequests=getMyFriendRequests;
        service.rejectFriendRequest=rejectFriendRequest;
        service.acceptFriendRequest=acceptFriendRequest;
        
        return service;

        
        function getMyFriends() {
            return $http.get(BASE_URL+'/myFriends')
                    .then(
                            function(response){
                                return response.data;
                            }, 
                           null
                    );
        }
        
        function getMyFriendRequests() {
            return $http.get(BASE_URL+'/getMyFriendRequests/')
                    .then(
                            function(response){
                                return response.data;
                            }, 
                           null
                    );
        }
        
        function sendFriendRequest(friendID){
            return $http.get(BASE_URL+'/addFriend/'+friendID)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while creating friend');
                                return $q.reject(errResponse);
                            }
                    );
        }
        
        function acceptFriendRequest(friendID){
            return $http.get(BASE_URL+'/acceptFriend/'+friendID)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while creating friend');
                                return $q.reject(errResponse);
                            }
                    );
        }
        
        function rejectFriendRequest(friendID){
            return $http.get(BASE_URL+'/rejectFriend/'+friendID)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while creating friend');
                                return $q.reject(errResponse);
                            }
                    );
        }
        
        
        function updateFriendRequest(friend, id){
            return $http.put(BASE_URL+'/friend/'+id, friend)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while updating friend');
                                return $q.reject(errResponse);
                            }
                    );
        }
        
        function deleteFriend(id){
            return $http.delete(BASE_URL+'/friend/'+id)
                    .then(
                            function(response){
                                return response.data;
                            }, 
                            function(errResponse){
                                console.error('Error while deleting friend');
                                return $q.reject(errResponse);
                            }
                    );
        }
        
    }

})();
