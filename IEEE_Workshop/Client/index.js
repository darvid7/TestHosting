/**
 * Created by David on 30/03/2016.
 */
// write out to the html doc
document.write("Happy word learning through gifs!");

var myApp = angular.module('myApp', []);

// interface with internet so uses HTTP
// interface with server, retrieve our words
// handles interaction with server
// while controller handles html part
myApp.service('HistoryService', function($http){
    var baseUrl = "http://localhost:8080/";          // string, address of server
    // function saveWord inside myApp.service
    this.saveWord = function(newWord){
        var url = baseUrl + "saveCurrent";           // server + save current (address of our post handler)
        return $http.post(url, {"word":newWord})    // send data from website to server
    };
    // HistoryService.saveWord(newWord)

    this.getSaved = function() {
        var url = baseUrl+'getSaved';
        return $http.get(url)
    }
});

myApp.service('GifService', function($http){
    var baseUrl = 'https://api.giphy.com/v1/gifs/';
    var apiKey = 'dc6zaTOxFJmzC';

    this.getGifs = function(query){
        var url = baseUrl + "search?q=" + query + "funny&api_key=" + apiKey;
        return $http.get(url)
    }
});




// note we have $scope as it uses the HTML file
myApp.controller('MyController', function($scope, GifService, HistoryService){
    $scope.newWord = 'cat';
    $scope.gifUrl = "";
    $scope.words =[];

    $scope.saveThisWord = function () {
        HistoryService.saveWord($scope.newWord)
            .then(saveSuccess, error)
    };

    function saveSuccess(json){
        console.log(json)
    }

    function error(err){
        console.log(err)
    }

    $scope.getSavedWords = function () {
        HistoryService.getSaved()
            .then(loadSuccess, error)
    };

    function loadSuccess (json){
        $scope.words = json.data
    }

    $scope.showGifs = function($event) {
        GifService.getGifs($event.currentTarget.innerHTML)
            .then(gifSuccess, error)
    };

    function gifSuccess(json){
        console.log("Request for gif")
        if (json.data.data[0]) {
            $scope.gifUrl = json.data.data[0].images.fixed_height.url
            console.log("gif req success")
        } else {
            $scope.gifUrl = "http://www.dailyrounds.org/blog/wp-content/uploads/2015/10/i-dont-know.jpg"
            console.log("gif req can't find")
        }
    }
});

