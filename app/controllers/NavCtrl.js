"use strict";

app.controller('navCtrl',($scope, AuthFactory) => {

  $scope.logout = () => {
    AuthFactory.logoutUser();
  }

})
