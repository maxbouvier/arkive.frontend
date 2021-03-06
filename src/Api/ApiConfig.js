import React from "react"
import axios from 'axios'
import hmacSHA256 from 'crypto-js/hmac-sha256';
export const configurations = {
    baseUrl:'http://dev2.spaceo.in/mappn_web_qa/api/v1/',
    // baseUrl: 'https://3b39-202-131-125-99.in.ngrok.io/api/v1/',
    secretKey: '5d816bd678ef051101dfa8a6084419cf',
    privateKey: 'ujC&XGHkFn5keIaC',
}

export const http = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
}
export const apiPath = {
    login: "login",
    verifyOtp: "verify-otp",
    resendOtp: "resend-otp",
    userProfile: "user-profile",
    logout: "logout",
    contacts: "contacts",
    friendRequest: "friend-request",
    friendResponse: "friend-response",
    removeFriend: "remove-friend",
    createAlbum: "create-album",
    userFriends: "user-friends",
    userAlbums: "user-albums",
    userAlbumsDetails: "user-albums-details",
    updateAlbum: "update-album",
    deleteAlbum: "delete-album",
    addPhoto: "add-photo",
    deletePhoto: "delete-photo"
}
export function getHeader(accesToken) {
    const { nonce, timestamp, hash } = getCredentials()
    return {
        headers: {
            // accept: "application/json",
            nonce: '1647323101921',
            timestamp: '1647323101921',
            token: 'f9ade52f2002a4de5b6115b3a7bcc61a8fd274b8fe0c85866ee4310e2027aba8',
            Authorization: (accesToken != '') ? accesToken : null
        }
    }
}

function getCredentials() {
    const nonce = new Date().getTime()
    const timestamp = new Date().getTime()
    const token = 'nonce=' + nonce + '&timestamp=' + timestamp + '|' + configurations.secretKey;
    var hash = hmacSHA256(token, configurations.privateKey).toString();
    return {
        nonce,
        timestamp,
        hash,
    }
}