"use strict";

app.controller("BoardViewCtrl", function ($scope, $routeParams, $window, firebaseFactory, AuthFactory) {

    $scope.pinArray = [];

    $scope.loadPinsToDom = function () {
        firebaseFactory.getBoardPins($routeParams.boardid)
        .then(function (filteredPinArray) {
            $scope.pinArray = filteredPinArray;
        })
    };

    $scope.addNewPin = () => {
        $window.location.href = `#/boards/${$routeParams.boardid}/newPin`
    }

    $scope.deletePin = function (pinID) {
        firebaseFactory.deletePin(pinID)
        .then((response) => {
          $scope.showToast("Dude, you deleted your pin");
        $scope.loadPinsToDom()
        })
    }

    $scope.editPin = function () {
        console.log("editPin running")
    }


})
