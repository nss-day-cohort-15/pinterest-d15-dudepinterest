"use strict";

var app = angular.module("DudePinterestApp", ["ngRoute"])
.constant("FirebaseURL", "https://dude-pinterest.firebaseio.com");


app.config(function($routeProvider) {
  $routeProvider.
  when("/home", {
    redirectTo: "/boards"
    }).
  when("/login", {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl"
  }).
  when("/boards", {
    templateUrl: "partials/user-profile.html",
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
  })
});

app.run( ($location, FBCreds) => {
    let creds = FBCreds
    let authConfig = {
        apiKey: creds.key,
        authDomain: creds.authDomain,
        databaseURL: creds.databaseURL
    }
    firebase.initializeApp(authConfig)
})
