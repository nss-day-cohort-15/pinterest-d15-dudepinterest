"use strict";

app.controller("BoardViewCtrl", function ($scope, $routeParams, $window, firebaseFactory, AuthFactory) {

    $scope.pinArray = []

    $scope.loadPinsToDom = function () {
        console.log("loadPinsToDom running")
        firebaseFactory.getPins($routeParams.boardid)
        .then(function (filteredPinArray) {
            $scope.pinArray = filteredPinArray
        })
    }

    $scope.addNewPin = () => {
        $window.location.href = `#/boards/${$routeParams.boardid}/newPin`
        AuthFactory.setBoardid(`${$routeParams.boardid}`);
    }

    $scope.deletePin = function (pinID) {
        console.log("deletePin running")
        firebaseFactory.deletePin(pinID)
        .then((response) => {
        $scope.loadPinsToDom()
        })
    }

    $scope.editPin = function () {
        console.log("editPin running")
        // firebaseFactory.patchPin(pinid)
    }


})
