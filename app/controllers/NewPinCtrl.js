"use strict";

app.controller('newPinCtrl',function($scope,$window,$routeParams,firebaseFactory) {

  $scope.newPin = {
    title: '',
    imgurl: '',
    description: '',
    boardid: $routeParams.boardid
  }

  $scope.pushPin = () => {
    firebaseFactory.pushPin($scope.newPin)
    .then(() => {
      window.location.href = `#/boards/${$routeParams.boardid}`
    });
  }

});
