"use strict";

app.controller("NewBoardCtrl", function ($scope, AuthFactory, firebaseFactory, $window) {

    let _uid = AuthFactory.getUid()

    $scope.newBoard = {
        "name": "",
        "boardid": "",
        "uid": _uid
    }

    $scope.addNewBoard = function () {
        firebaseFactory.pushBoard($scope.newBoard)
        .then( function () {
            $window.location.href = "#/boards"
        })
    }


})