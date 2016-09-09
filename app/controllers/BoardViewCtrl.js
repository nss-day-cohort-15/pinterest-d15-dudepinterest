"use strict";

app.controller("BoardViewCtrl", function ($scope, $routeParams, $window, firebaseFactory) {

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
    }

    $scope.deletePin = function () {
        console.log("deletePin running")
        // firebaseFactory.deletePin(pinid)
    }
    $scope.editPin = function () {
        console.log("editPin running")
        // firebaseFactory.patchPin(pinid)
    }


})
