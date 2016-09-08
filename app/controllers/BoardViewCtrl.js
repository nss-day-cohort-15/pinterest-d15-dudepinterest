"use strict";

app.controller("BoardViewCtrl", function ($scope, $routeParams, $location, firebaseFactory) {

    $scope.pinArray = []

    $scope.loadPinsToDom = function () {
        console.log("loadPinsToDom running")
        firebaseFactory.getPins($routeParams.boardid)
        .then(function (filteredPinArray) {
            $scope.pinArray = filteredPinArray
        })
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