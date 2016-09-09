"use strict";

app.controller("ProfileCtrl", function ($scope, firebaseFactory, $routeParams, AuthFactory, $window, $location) {

    $scope.boardArray = []

    $scope.loadBoardsToDom = function () {
        if (AuthFactory.getUid()) {
            firebaseFactory.getBoards(AuthFactory.getUid())
            .then(function (filteredBoardArray) {
                $scope.boardArray = filteredBoardArray
            })
        } else {
            firebase.auth().onAuthStateChanged(() => {
                firebaseFactory.getBoards(AuthFactory.getUid())
                .then(function (filteredBoardArray) {
                    $scope.boardArray = filteredBoardArray
                })
            })
        }
    }

    $scope.addNewBoard = function () {
        $window.location.href = "#/boards/new"
        // firebaseFactory.pushBoard(boardObj)
    }

    $scope.deleteBoard = function (boardID) {
        console.log("deleteBoard is running")
        firebaseFactory.deleteBoard(boardID)
        .then((response) => {
        $scope.loadBoardsToDom()
        });
    }

    $scope.editBoard = function () {
        console.log("editBoard is running")
        // firebaseFactory.patchBoard($routeParams.boardid)
    }



})
