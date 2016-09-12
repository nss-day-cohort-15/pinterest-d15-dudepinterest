"use strict";

var app = angular.module("DudePinterestApp", ["ngRoute", "ngMaterial"]);
app.constant("FirebaseURL", "https://dude-pinterest.firebaseio.com");


app.config(function($routeProvider) {
    $routeProvider.
    when("/home", {
        redirectTo: "/profile"
    }).
    when("/login", {
        templateUrl: "partials/login.html",
        controller: "LoginCtrl"
    }).
    when("/profile", {
        templateUrl: "partials/user-profile-boards.html",
        controller: "ProfileCtrl"
    }).
    when("/boards/new", {
        templateUrl: "partials/board-new.html",
        controller: "NewBoardCtrl"
    }).
    when("/boards/:boardid", {
        templateUrl: "partials/board-view.html",
        controller: "BoardViewCtrl"
    }).
    when("/boards/edit/:boardid", {
        templateUrl: "partials/board-edit.html",
        controller: "BoardEditCtrl"
    }).
    when("/boards/:boardid/newPin", {
        templateUrl: "partials/pin-new.html",
        controller: "newPinCtrl"
    }).
    when("/edit/:boardid/:pinid", {
        templateUrl: "partials/pin-edit.html",
        controller: "PinEditCtrl"
    }).
    when('/explore/pins', {
        templateUrl: "partials/allpins.html",
        controller: "ExploreCtrl"
    }).
    when('/explore/boards', {
        templateUrl: "partials/allboards.html",
        controller: "ExploreCtrl"
    }).
    when('/explore/boards/:boardid', {
        templateUrl: "partials/explore-board-view.html",
        controller: "BoardViewCtrl"
    }).
    when('/pin/:pinid', {
        templateUrl: "partials/single-pin.html",
        controller: "SinglePinCtrl"
    }).
    when('/explore/newpin/:pinid', {
        templateUrl: "partials/pin-new.html",
        controller: "newPinCtrl"

    })
});

app.run(($location, FBCreds) => {
    let creds = FBCreds
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    }
    firebase.initializeApp(authConfig)
})
