"use strict";

app.controller("ProfileCtrl", function ($scope, firebaseFactory, $routeParams, AuthFactory, $window, $location) {

    $scope.boardArray = []

    $scope.loadBoardsToDom = function () {
        firebaseFactory.getBoards(AuthFactory.getUid())
        .then(function (filteredBoardArray) {
            $scope.boardArray = filteredBoardArray
        })
    }

    $scope.addNewBoard = function () {
        console.log("addNewBoard is running")
        $window.location.href = "#/boards/new"
        // firebaseFactory.pushBoard(boardObj)
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