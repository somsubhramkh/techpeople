(function () {
    'use strict';

    angular
        .module('app')
        .controller('FriendController', FriendController);

    FriendController.$inject = ['UserService','$scope', 'FriendService','$location','$rootScope'];
    function FriendController(UserService,$scope,FriendService,$location,$rootScope) {

    	var vm=this;
    	vm.friend=null;
    	vm.friends=[];
    	vm.user=null;
    	vm.users=[];
    	vm.friendRequests=[];
    	
    	vm.sendFriendRequest=sendFriendRequest;
    	vm.getMyFriends=getMyFriends;
    	vm.updateFriendRequest=updateFriendRequest;
    	vm.deleteFriend=deleteFriend;
    	vm.fetchAllUsers=fetchAllUsers;
    	vm.acceptFriendRequest=acceptFriendRequest;
    	vm.rejectFriendRequest=rejectFriendRequest;
    	
    	fetchAllUsers();
    	getMyFriends();
    	getMyFriendRequests();
    	
    	function sendFriendRequest(friendID)
        {

      	  console.log("->sendFriendRequest :"+friendID)
            FriendService.sendFriendRequest(friendID)
                .then(
                             function(d) {
                                  vm.friend = d;
                                 alert("Friend request sent")
                             },
                              function(errResponse){
                                  console.error('Error while sending friend request');
                              }
                     );
        
       	 
        }
    	
    	
    	function acceptFriendRequest(friendID)
        {

      	  console.log("->AcceptFriendRequest :"+friendID)
            FriendService.acceptFriendRequest(friendID)
                .then(
                             function(d) {
                                  //vm.friend = d;
                            	 getMyFriendRequests();
                                 alert("Friend request Accepted")
                             },
                              function(errResponse){
                                  console.error('Error while sending friend request');
                              }
                     );
        
       	 
        }
    	
    	function rejectFriendRequest(friendID)
        {

      	  console.log("->RejectFriendRequest :"+friendID)
            FriendService.rejectFriendRequest(friendID)
                .then(
                             function(d) {
                                  //vm.friend = d;
                            	 getMyFriendRequests();
                                 alert("Friend request rejected");
                             },
                              function(errResponse){
                                  console.error('Error while sending friend request');
                              }
                     );
        
       	 
        }
    	
    	function getMyFriends(){
      	  console.log("Getting my friends")
            FriendService.getMyFriends()
                .then(
                             function(d) {
                                  vm.friends = d;
                                  console.log("Got the friends list")
                                   	
                             },
                              function(errResponse){
                                  console.error('Error while fetching Friends');
                              }
                     );
        }
    	
    	
    	function getMyFriendRequests(){
        	  console.log("Getting my friend requests")
              FriendService.getMyFriendRequests()
                  .then(
                               function(d) {
                                    vm.friendRequests = d;
                                    console.log("Got the friend requests");
                                     	
                               },
                                function(errResponse){
                                    console.error('Error while fetching Friends');
                                }
                       );
          }
    	
    	function updateFriendRequest(friend, id){
            FriendService.updateFriendRequest(friend, id)
                    .then(
                            fetchAllFriends, 
                            function(errResponse){
                                 console.error('Error while updating Friend.');
                            } 
                );
        }
    	
    	
    	function deleteFriend(id){
            FriendService.deleteFriend(id)
                    .then(
                            fetchAllFriends, 
                            function(errResponse){
                                 console.error('Error while deleting Friend.');
                            } 
                );
        }
    	
    	
    	function fetchAllUsers() {
			UserService.GetAllExceptCurrent().then(function(d) {
				vm.users = d;
			}, function(errResponse) {
				console.error('Error while fetching Users');
			});
		}
    	
    }

})();
