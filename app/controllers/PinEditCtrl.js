"use strict";

app.controller("PinEditCtrl", function($scope, $location, $routeParams, firebaseFactory, AuthFactory) {
  $scope.title = "Edit Pin"
  $scope.btnText = "Update";
  $scope.pins = [];
  $scope.newPin = {};

  firebaseFactory.getEditPins(AuthFactory.getUid())
  .then( (filteredPinArray) => {
    $scope.pins = filteredPinArray;
    $scope.selectedPin = $scope.pins.filter(function(pin) {
      return pin.pinid === $routeParams.pinid;
    })[0];
  })

  $scope.addNewItem = () => {
    $scope.showToast("Dude, nice edit.")
      firebaseFactory.updateSinglePin($routeParams.pinid, $scope.selectedPin)
          .then((response) => {
              $location.url(`/boards/${$routeParams.boardid}`)
          });
  };
});
