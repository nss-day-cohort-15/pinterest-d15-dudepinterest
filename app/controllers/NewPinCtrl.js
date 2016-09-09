"use strict";

app.controller('newPinCtrl',function($scope,$window,$routeParams,firebaseFactory,AuthFactory) {

  $scope.newPin = {
    title: '',
    imgurl: '',
    description: '',
    boardid: $routeParams.boardid
  }

  $scope.pushPin = () => {
    $scope.newPin.uid = AuthFactory.getUid();
    $scope.showToast("Dude, new pin. Sweet!");

    firebaseFactory.pushPin($scope.newPin)
    .then(() => {
      $window.location.href = `#/boards/${$routeParams.boardid}`;
    });
  }

});
