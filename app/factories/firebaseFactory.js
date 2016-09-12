"use strict";

app.factory('firebaseFactory',function($q,$http,FBCreds, FirebaseURL) {

  let getBoards = (userID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/boards.json`)
      .then((data) => {
        let boardArray = convertResultsToArray(data.data,'boardid',userID);
        let filteredBoardArray = filterArrayByID(boardArray,'uid',userID);
        resolve(filteredBoardArray);
      }, (error) => {
        console.error(error);
        reject(error);
      })
    })
  };

  let getAllBoards = (userID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/boards.json`)
      .then((data) => {
        let boardArray = convertResultsToArray(data.data,'boardid',userID);
        let filteredBoardArray = filterArrayByNotID(boardArray,'uid',userID);
        resolve(filteredBoardArray);
      }, (error) => {
        console.error(error);
        reject(error);
      })
    })
  };

  let getSingleBoard = (boardID) => {
    return $q( (resolve, reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/boards/${boardID}.json`)
      .success( (boardObj) => {
        resolve(boardObj)
      })
      .error( (error) => {
        reject(error);
      });
    });
  };

  let getSinglePin = (pinID) => {
    return $q( (resolve, reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins/${pinID}.json`)
      .success( (pinObj) => {
        resolve(pinObj)
      })
      .error( (error) => {
        reject(error);
      });
    });
  }

  let updateSingleBoard = (boardID, editedBoard) => {
    return $q( (resolve, reject) => {
      $http.patch(`https://dude-pinterest.firebaseio.com/boards/${boardID}.json`, JSON.stringify(editedBoard))
      .success( (ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .error( (error) => {
        reject(error)
      });
    });
  };

  let updateSinglePin = (pinId, editedPin) => {
    return $q( (resolve, reject) => {
      $http.patch(`https://dude-pinterest.firebaseio.com/pins/${pinId}.json`, JSON.stringify(editedPin))
      .success( (ObjectFromFirebase) => {
        resolve(ObjectFromFirebase);
      })
      .error( (error) => {
        reject(error)
      });
    });
  };

  let getBoardPins = (boardID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins.json`).then((data) => {
        let pinArray = convertResultsToArray(data.data,'pinid');
        let filteredPinArray = filterArrayByID(pinArray,'boardid',boardID);
        resolve(filteredPinArray);
      } ,(error) => {
        console.error(error);
        reject(error);
      })
    })
  };

  let getUserPins = (uid) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins.json`).then((data) => {
        let pinArray = convertResultsToArray(data.data,'pinid');
        let filteredPinArray = filterArrayByID(pinArray,'uid',uid);
        resolve(filteredPinArray);
      } ,(error) => {
        console.error(error);
        reject(error);
      })
    })
  }

  let getAllPins = (uid) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins.json`).then((data) => {
        let pinArray = convertResultsToArray(data.data,'pinid');
        let filteredPinArray = filterArrayByNotID(pinArray,'uid',uid);
        resolve(filteredPinArray);
      } ,(error) => {
        console.error(error);
        reject(error);
      })
    })
  }

  let getEditPins = (userID) => {
    return $q((resolve,reject) => {
      $http.get(`https://dude-pinterest.firebaseio.com/pins.json`)
      .then((data) => {
        let pinArray = convertResultsToArray(data.data,'pinid',userID);
        let filteredPinArray = filterArrayByID(pinArray,'uid',userID);
        resolve(filteredPinArray);
      }, (error) => {
        console.error(error);
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

  let filterArrayByNotID = (data, idType, ID) => {
    let filteredData = data.filter((element) => {
      return element[idType] !== ID;
    })
    return filteredData;
  }

  return {getBoards,getAllBoards,getBoardPins,getUserPins,getAllPins,pushBoard,pushPin,patchBoard,patchPin,deleteBoard,deletePin, getSingleBoard, updateSingleBoard, getEditPins, updateSinglePin, getSinglePin}

})
