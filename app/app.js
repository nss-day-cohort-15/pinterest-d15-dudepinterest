"use strict";

var app = angular.module("DudePinterestApp", ["ngRoute"]);

app.config(function($routeProvider) {
  $routeProvider.
  when("/", {
    templateUrl: "partials/login.html",
    controller: "LoginCtrl"
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
  otherwise("/login");
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