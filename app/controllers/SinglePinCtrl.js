"use strict";

app.controller("SinglePinCtrl", function($scope,$window,$routeParams,firebaseFactory) {
  $scope.title = "";
  $scope.imgURL = "";
  $scope.description = "";
  firebaseFactory.getSinglePin($routeParams.pinid).then( (pinObj) => {
    console.log(pinObj)
    $scope.title = pinObj.title;
    $scope.imgURL = pinObj.imgurl;
    $scope.description = pinObj.description;
  })
})
