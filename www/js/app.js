// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('ionicApp', ['ionic'])

.directive('input', function($timeout) {
    return {
        restrict: 'E',
        scope: {
            'returnClose': '=',
            'onReturn': '&',
            'onFocus': '&',
            'onBlur': '&'
        },
        link: function(scope, element, attr) {
            element.bind('focus', function(e) {
                if (scope.onFocus) {
                    $timeout(function() {
                        scope.onFocus();
                    });
                }
            });
            element.bind('blur', function(e) {
                if (scope.onBlur) {
                    $timeout(function() {
                        scope.onBlur();
                    });
                }
            });
            element.bind('keydown', function(e) {
                if (e.which == 13) {
                    if (scope.returnClose) element[0].blur();
                    if (scope.onReturn) {
                        $timeout(function() {
                            scope.onReturn();
                        });
                    }
                }
            });
        }
    }
})


.controller('Messages', function($scope, $timeout, $ionicScrollDelegate, $http) {
    $scope.data = {};
    $scope.myId = 'wordRight';
    $scope.messages = [];
    $scope.apikey = "AIzaSyDqOnCv6Up_yeFhEXwlSZdbTJD3yZifnZ8";


    var alternate,
        isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

    $scope.sendMessage = function() {


        $scope.messages.push({
            userId: 'wordLeft',
            text: $scope.data.message
        });

        var api_url = 'https://www.googleapis.com/language/translate/v2?key='+ $scope.apikey +'&q='+ $scope.data.message +'&source=th&target=en';
        $http.get(api_url).then(function(response) {
            //the response from the server is now contained in 'response'
            result = response.data.data.translations[0].translatedText;
            $scope.callMessage(result);


            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);

        }, function(error) {
            //there was an error fetching from the server
            $scope.callMessage('');
            delete $scope.data.message;
            $ionicScrollDelegate.scrollBottom(true);
        });



    };
    $scope.callMessage = function(message) {
        $scope.messages.push({
            userId: 'wordRight',
            text: message
        });
    };


    $scope.inputUp = function() {
        if (isIOS) $scope.data.keyboardHeight = 216;
        $timeout(function() {
            $ionicScrollDelegate.scrollBottom(true);
        }, 300);

    };

    $scope.inputDown = function() {
        if (isIOS) $scope.data.keyboardHeight = 0;
        $ionicScrollDelegate.resize();
    };

    $scope.closeKeyboard = function() {
        // cordova.plugins.Keyboard.close();
    };




})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

            // Don't remove this line unless you know what you are doing. It stops the viewport
            // from snapping when text inputs are focused. Ionic handles this internally for
            // a much nicer keyboard experience.
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})
