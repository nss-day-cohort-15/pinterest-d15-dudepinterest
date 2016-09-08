"use strict";

app.controller("ProfileCtrl", function ($scope, firebaseFactory, $routeParams, AuthFactory) {

    $scope.boardArray = []

    $scope.loadBoardsToDom = function () {
        firebaseFactory.getBoards(AuthFactory.getUid())
        .then(function (filteredBoardArray) {
            $scope.boardArray = filteredBoardArray
        })
    }

    $scope.deleteBoard = function () {
        console.log("deleteBoard is running")
        // firebaseFactory.deleteBoard($routeParams.boardid)
    }

    $scope.editBoard = function () {
        console.log("editBoard is running")
        // firebaseFactory.patchBoard($routeParams.boardid)
    }

})