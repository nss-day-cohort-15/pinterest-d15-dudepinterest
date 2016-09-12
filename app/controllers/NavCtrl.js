"use strict";

app.controller('navCtrl',($scope, $window, AuthFactory) => {

  $scope.logout = () => {
    AuthFactory.logoutUser();
  }

  $scope.homeNav = () => {
    let uid = AuthFactory.getUid();
    if (uid) {
      $window.location.href = "#/profile"
    } else {
      $window.location.href = "#/login"
    }
  }

})
