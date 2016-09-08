"use strict";

app.controller("BoardViewCtrl", function ($scope, $routeParams, $location, firebaseFactory) {

    $scope.pinArray = []

    $scope.loadPinsToDom = function () {
        console.log("loadPinsToDom running")
        console.log("routeParams BoardID", $routeParams.boardid)
        firebaseFactory.getPins($routeParams.boardid)
        .then(function (filteredPinArray) {
            $scope.pinArray = filteredPinArray
        })
    }


})