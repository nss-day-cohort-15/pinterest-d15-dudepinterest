"use strict";

app.controller("LoginCtrl", function ($scope, $window, AuthFactory) {

    $scope.account = {
        email: "",
        password: ""
    }

    $scope.register = () => {
        console.log("you clicked register")
        AuthFactory.createUser({
            email: $scope.account.email,
            password: $scope.account.password
        })
        .then( (userData) => {
            console.log("userData", userData)
            $scope.showToast("Dude, you registered for dude, pinterest");

            $scope.login()
        }, (error) => {
            console.log(`Error creating user: ${error}`)
        })
    }

    $scope.login = () => {
        console.log("you clicked login")
        AuthFactory.loginUser($scope.account)
        .then( (data) => {
            if (data) {
            // AuthFactory.setUid(data.uid)
            $window.location.href = "#/boards"
            $scope.showHelloToast();
            } else {
            $window.location.href = "#/login"
            }
            console.log("data from login", AuthFactory.getUid())
        })
    }




})
