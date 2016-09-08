"use strict";

app.factory('firebaseFactory',function($q,$http,FBCreds) {
  let getBoards = (userID) => {
    return $q((resolve,reject) => {
      $http.get(`{FBCreds.databaseURL}/boards`).then((data) => {
        boardArray = convertResultsToArray(data,'boardid',userID);
        filteredBoardArray = filterArrayByID(boardArray,'uid',userID);
        resolve(filteredBoardArray);
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };

  let getPins = (boardID) => {
    return $q((resolve,reject) => {
      $http.get(`{FBCreds.databaseURL}/pins`).then((data) => {
        pinArray = convertResultsToArray(data,'pinid');
        filteredPinArray = filterArrayByID(pinArray,'boardid',boardID);
        resolve(filteredPinArray);
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };

  let pushBoard = (boardObj) => {
    return $q((resolve,reject) => {
      $http.post('{FBCreds.databaseURL}/boards',boardObj).then((boardID) => {
        resolve(boardID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };
  let pushPin = (pinObj) => {
    return $q((resolve,reject) => {
      $http.post('{FBCreds.databaseURL}/pins',pinObj).then((pinID) => {
        resolve(pinID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };

  let patchBoard = (boardObj) => {
    return $q((resolve,reject) => {
      $http.patch('{FBCreds.databaseURL}/boards/{boardObj.boardid}',boardObj).then((boardID) => {
        resolve(boardID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };
  let patchPin = (pinObj) => {
    return $q((resolve,reject) => {
      $http.patch('{FBCreds.databaseURL}/pins/{pinObj.pinid}',pinObj).then((pinID) => {
        resolve(pinID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };

  let deleteBoard = (boardID) => {
    return $q((resolve,reject) => {
      $http.delete('{FBCreds.databaseURL}/boards/{boardid}').then((boardID) => {
        resolve(boardID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };
  let deletePin = (pinID) =>
    return $q((resolve,reject) => {
      $http.delete('{FBCreds.databaseURL}/pins/{pinid}').then((pinID) => {
        resolve(pinID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };

  let convertResultsToArray = (object,idType,uid) => {
    let resultsArray = [];
    let keysArray = Object.keys(object);
    keysArray.forEach((key) => {
      object[key][idType] = key;
      if (uid) {
        object[key].uid = uid;
      }
      resultsArray.push(object[key]);
    })
    return resultsArray;
  }

  let filterArrayByID = (data, idType, ID) => {
    filteredData = data.filter((element) => {
      return element[idType] === ID;
    })
    return filteredData;
  }

  return {getBoards,getPins,pushBoard,pushPin,patchBoard,patchPin,deleteBoard,deletePin}
})
