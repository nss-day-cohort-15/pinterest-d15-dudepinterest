"use strict";

app.factory("AuthFactory", function () {

    let _uid = null;
    let _boardid = null;

    let getUid = function () {
        return _uid
    }


    firebase.auth().onAuthStateChanged(function (user) {
        console.log("onAuthStateChanged running")
        _uid = user.uid
        console.log("uid in onAuthStateChanged", _uid)
    })

    let createUser = function (userObj) {
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch(function (error) {
            let errorCode = error.code
            let errorMessage = error.message
            // ..... more later
        })
    }

    let loginUser = function (userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .catch( function (error) {
            let errorCode = error.code
            let errorMessage = error.message
            console.log("errorCode", errorCode)
            console.log("errorMessage", errorMessage)
            // ..... more error handling later
        })
    }

    let logoutUser = function () {
        return firebase.auth().signOut()
    }

    let isAuthenticated = function () {
        return (firebase.auth().currentUser) ? true : false
    }

    return {createUser, loginUser, logoutUser, getUid, isAuthenticated}

})
