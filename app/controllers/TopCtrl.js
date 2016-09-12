"use strict";

app.controller("TopCtrl", function ($scope, $location, $window, AuthFactory,firebaseFactory) {

    $scope.isLoggedIn = false;
    $scope.userBoards = [];

    // This is a watcher method built on the Firebase auth() method
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $scope.isLoggedIn = true
            firebaseFactory.getBoards(user.uid)
                .then((boardsArray) => {
                    $scope.userBoards = boardsArray;
                })
            console.log("user logged in?", $scope.isLoggedIn)
        } else {
            $scope.isLoggedIn = false
            $scope.userBoards = [];
            console.log("user logged in?", $scope.isLoggedIn)
            $window.location.href = "#/login"
        }
        // Normally, Angular would know that this variable ($scope.isLoggedIn) changed
        // But because we are not using an Angular feature or directive to change this value,
        // We need to manually force the Dirty Checking of this variable
        $scope.$apply()
    })

    $scope.logout = function () {
        AuthFactory.logoutUser()
        .then(function (data) {
            console.log("User logged out")
        })
    }


})
