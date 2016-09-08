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

  let pushBoard = (userID) => {};
  let pushPin = (boardID) => {};

  let patchBoard = (boardID) => {};
  let patchPin = (pinID) => {};

  let deleteBoard = (boardID) => {};
  let deletePin = (pinID) => {};

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
