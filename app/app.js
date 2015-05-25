'use strict';

function log(msg) { console.log(msg) }

// Declare app level module which depends on views, and components
var riverd = angular.module('riverd', []);
riverd.controller("dockerCtrl", function($scope, $http, xmppAuth) {
    console.log("test");

    $http({
        url:"http://localhost:2375/containers/json",
        method: "GET",
        params: {"all": true}
    }).success(function(response) {
        console.log(response);
        $scope.containers = response;

    }).error(function(data, status, headers, config) { console.log(data) });


    $scope.login = function(user) {
        xmppAuth.auth(user.name, user.password);
    };

});


riverd.service("xmppAuth", function() {
    this.auth = function(username,password) {
        var connect = new Strophe.Connection("http://openfire:7070/http-bind/");
        console.log("connecting....");
        connect.rawInput = log;
        connect.rawOutput = log;
        connect.connect(username,password, function(status) {
            if(status === Strophe.Status.CONNECTED) {
                console.log("connected.");
            } else {
                console.log("failed..." + status + " " + connect.jid)
            }
        });
    }

})