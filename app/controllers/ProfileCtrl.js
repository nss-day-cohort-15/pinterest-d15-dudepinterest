"use strict";

app.controller("ProfileCtrl", function ($scope, firebaseFactory, $routeParams, AuthFactory, $window, $location) {

    $scope.boardArray = [];
    $scope.pinArray = [];

    $scope.loadBoardsToDom = function () {
        if (AuthFactory.getUid()) {
            firebaseFactory.getBoards(AuthFactory.getUid())
            .then(function (filteredBoardArray) {
                $scope.boardArray = colorize(filteredBoardArray)
            })
        } else {
            firebase.auth().onAuthStateChanged(() => {
                firebaseFactory.getBoards(AuthFactory.getUid())
                .then(function (filteredBoardArray) {
                    $scope.boardArray = colorize(filteredBoardArray);
                })
            })
        }
    }

    $scope.loadPinsToDom = () => {
        if (AuthFactory.getUid()) {
            firebaseFactory.getUserPins(AuthFactory.getUid())
            .then(function (filteredPinArray) {
                $scope.pinArray = filteredPinArray;
            })
        } else {
            firebase.auth().onAuthStateChanged(() => {
                firebaseFactory.getUserPins(AuthFactory.getUid())
                .then(function (filteredPinArray) {
                    $scope.pinArray = filteredPinArray;
                })
            })
        }
    }

    $scope.addNewBoard = function () {
        $window.location.href = "#/boards/new"
    }

    $scope.deleteBoard = function (boardID) {
        firebaseFactory.deleteBoard(boardID)
        .then((response) => {
        $scope.loadBoardsToDom()
        });
    }

    $scope.deletePin = function (pinID) {
        firebaseFactory.deletePin(pinID)
        .then((response) => {
          $scope.showToast("Dude, you deleted your pin");

        $scope.loadPinsToDom()
        })
    }

    let colorize = (arrayOfBoards) => {
        arrayOfBoards.forEach((board) => {
            board.color = getRandomColor();
        })
        return arrayOfBoards;
    }

    let getRandomColor = () => {
        let colors = ['#f44336','#e91e63','#9c27b0','#673ab7','#3f51b5','#2196f3','#03a9f4','#00bcd4 ','#009688','#4caf50','#8bc34a',
        '#cddc39','#ffeb3b','#ffc107','#ff9800','#ff5722','#795548','#9e9e9e','#607d8b'];
        let colorIndex = Math.floor(Math.random() * colors.length);
        return colors[colorIndex];
    }

})
