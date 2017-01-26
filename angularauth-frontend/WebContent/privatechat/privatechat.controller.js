angular.module('app').controller("PrivateChatController", function($scope, PrivateChatService) {
  $scope.messages = [];
  $scope.message = "";
  $scope.max = 140;

  $scope.addMessage = function() {
	  console.log("addMessage")
    PrivateChatService.send($scope.message);
    $scope.message = "";
  };

  PrivateChatService.receive().then(null, null, function(message) {
	  console.log("receive")

    $scope.messages.push(message);
  });
});