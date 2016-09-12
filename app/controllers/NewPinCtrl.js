"use strict";

app.controller('newPinCtrl',function($scope,$window,$routeParams,firebaseFactory,AuthFactory) {

  $scope.newPin = {
    title: '',
    imgurl: '',
    description: '',
    boardid: $routeParams.boardid
  }

  if ($routeParams.pinid) {
    firebaseFactory.getSinglePin($routeParams.pinid)
      .then((data) => {
        $scope.newPin = {
          title: data.title,
          imgurl: data.imgurl,
          description: data.description,
          boardid: $routeParams.boardid
        }
      })
  }

  $scope.pushPin = () => {
    $scope.newPin.uid = AuthFactory.getUid();
    $scope.showToast("Dude, new pin. Sweet!");

    firebaseFactory.pushPin($scope.newPin)
    .then(() => {
      if ($routeParams.boardid) {
        $window.location.href = `#/boards/${$routeParams.boardid}`;
      } else {
        $window.location.href = '#/profile'
      }
    });
  }

});
