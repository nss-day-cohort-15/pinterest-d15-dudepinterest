"use strict";

app.controller("BoardEditCtrl", function($scope, $location, $routeParams, firebaseFactory, AuthFactory) {
    $scope.title = "Edit Board"
    $scope.btnText = "Update";
    $scope.boards = [];
    $scope.newBoard = {};

    firebaseFactory.getBoards(AuthFactory.getUid())
      .then( (filteredBoardArray)=> {
        $scope.boards = filteredBoardArray;
        $scope.selectedBoard = $scope.boards.filter(function(board) {
          return board.boardid === $routeParams.boardid;
        })[0];
      });



    $scope.addNewItem = () => {
        firebaseFactory.updateSingleBoard($routeParams.boardid, $scope.selectedBoard)
            .then((response) => {
                $location.url("/boards")
            });
    };



});
