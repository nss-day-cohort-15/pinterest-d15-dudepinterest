"use strict";

app.controller("ProfileCtrl", function ($scope, firebaseFactory, $routeParams, AuthFactory) {

    $scope.boardArray = []

    $scope.loadBoardsToDom = function () {
        firebaseFactory.getBoards(AuthFactory.getUid())
        .then(function (filteredBoardArray) {
            $scope.boardArray = filteredBoardArray
        })
    }




})