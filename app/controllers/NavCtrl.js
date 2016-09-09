"use strict";

app.controller('navCtrl',($scope) => {

  $scope.logout = () => {
    AuthFactory.logoutUser;
  }

})
