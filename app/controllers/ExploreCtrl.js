"use strict";

app.controller('ExploreCtrl', function($scope,AuthFactory,firebaseFactory){

  $scope.pinArray = [];

  $scope.loadPinsToDom = () => {
    if (AuthFactory.getUid()) {
        firebaseFactory.getAllPins(AuthFactory.getUid())
        .then(function (filteredPinArray) {
          $scope.pinArray = filteredPinArray;
        })
    } else {
        firebase.auth().onAuthStateChanged(() => {
          firebaseFactory.getAllPins(AuthFactory.getUid())
          .then(function (filteredPinArray) {
            $scope.pinArray = filteredPinArray;
          })
        })
    }
  }

  $scope.loadBoardsToDom = () => {
    if (AuthFactory.getUid()) {
      firebaseFactory.getAllBoards(AuthFactory.getUid())
      .then(function (filteredBoardArray) {
        $scope.boardArray = colorize(filteredBoardArray)
      })
    } else {
      firebase.auth().onAuthStateChanged(() => {
        firebaseFactory.getAllBoards(AuthFactory.getUid())
        .then(function (filteredBoardArray) {
          $scope.boardArray = colorize(filteredBoardArray);
        })
      })
    }
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
