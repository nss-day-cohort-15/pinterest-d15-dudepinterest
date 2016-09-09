"use strict";

app.factory('firebaseFactory',function($q,$http,FBCreds, FirebaseURL) {

  let getBoards = (userID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/boards.json`)
      .then((data) => {
        let boardArray = convertResultsToArray(data.data,'boardid',userID);
        let filteredBoardArray = filterArrayByID(boardArray,'uid',userID);
        console.log("filteredData from firebase", filteredBoardArray)
        resolve(filteredBoardArray);
      }, (error) => {
        console.error(error);
        reject(error);
      })
    })
  };

  let getPins = (boardID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins.json`).then((data) => {
        let pinArray = convertResultsToArray(data.data,'pinid');
        let filteredPinArray = filterArrayByID(pinArray,'boardid',boardID);
        resolve(filteredPinArray);
      } ,(error) => {
        // console.error(error);
        reject(error);
      })
    })
  };

  let pushBoard = (boardObj) => {
    return $q((resolve,reject) => {
      $http.post("https://dude-pinterest.firebaseio.com/boards.json",boardObj).then((boardID) => {
        resolve(boardID)
      }),(error) => {
        console.error(error);
        reject(error);
      }
    })
  };
  let pushPin = (pinObj) => {
    return $q((resolve,reject) => {
      $http.post('https://dude-pinterest.firebaseio.com/pins.json',pinObj).then((pinID) => {
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
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}/boards/${boardID}.json`)
      .success((ObjFromFirebase) => {
        resolve(ObjFromFirebase);
      });
    });
  };



   let deletePin = (pinID) => {
    return $q((resolve, reject) => {
      $http.delete(`${FirebaseURL}/pins/${pinID}.json`)
      .success((ObjFromFirebase) => {
        resolve(ObjFromFirebase);
      });
    });
  };



  let convertResultsToArray = (object,idType,uid) => {
    let resultsArray = [];
    let keysArray = Object.keys(object);
    keysArray.forEach((key) => {
      object[key][idType] = key;
      resultsArray.push(object[key]);
    })
    return resultsArray;
  }

  let filterArrayByID = (data, idType, ID) => {
    let filteredData = data.filter((element) => {
      return element[idType] === ID;
    })
    return filteredData;
  }

  return {getBoards,getPins,pushBoard,pushPin,patchBoard,patchPin,deleteBoard,deletePin}

})
