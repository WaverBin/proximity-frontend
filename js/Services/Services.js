angular.module('proximity.services', []);

redirectTo('users');

var SERVER_URL = {
    local: 'http://' + window.location.hostname + ':8080',
    dev: 'http://proximitybackend-waverbin.rhcloud.com:8000'
};

var env =  localStorage.getItem('env') || 'dev';   // Current env
var user = localStorage.getObject('user');	       // User data fetched from localcache in LoginController
var socketUrl = SERVER_URL[env];	                 // Server URL
var socket = io.connect(socketUrl);                // Socket

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function redirectToUsers(){
    redirectTo('users');
}

function redirectToHome(){
    redirectTo('');
}

function redirectToConversations(){
    redirectTo('conversations');
}

function toTitle(str) {
    return str.replace(/_/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function redirectTo(section){
    window.location.replace(window.location.origin + '/' + (window.location.search != '' ? window.location.search + '/' : '') + '#/tab/' + section);
}