var app = angular.module("myApp",  ['ngAnimate']);

app.controller("myCtrl", function($scope, $http, $window) {
  $scope.states = {};
  $scope.userOff = 0;
  $scope.eventOff = 0;
  $scope.pageOff = 0;
  $scope.groupOff = 0;
  $scope.placeOff = 0;
  $scope.alNums = 5;
  //$scope.searchHeader = true;
  $scope.userTable = false;
  $scope.secondPage = false;
  $scope.favTable = false;
  $scope.keyword = '';
  $scope.states.activeItem = 'user';
    $scope.navitems = [{
        id: 'user',
        title: 'Users'
    }, {
        id: 'page',
        title: 'Pages'
    }, {
        id: 'event',
        title: 'Events'
    }, {
        id: 'place',
        title: 'Places'
    }, {
        id: 'group',
        title: 'Groups'
    }, {
        id: 'fav',
        title: 'Favorites'
    }
    ];

    $scope.clearFormData = function() {
        $scope.favTable = false;
        $scope.secondPage = false;
        $scope.userTable = false;
        $scope.searchPro = false;
        $scope.keyword = '';
        $scope.states.activeItem = 'user';
    }

    $scope.getURL = function() {
      var url = 'https://graph.facebook.com/v2.8/1084855054970797/picture?redirect=false&access_token=EAAXbZBNb7RzMBAGaC38bR3xW0BKS2SKTJwKuyg8RpNkwCx1JFQySthvxjHygReDgNAKpg4H5XcjXDJ5UBSXYZBpQuXOFtmwSs4qZCrrCFlI5E5MEIIh8SR3ulTnbRtNhhbZCbkaPqQaFuzYlQ43UarsPB1x0IlYZD';
      $http.get(url).
            success(function(data, status, headers, config) {
              return data.data.url;
            }).
            error(function(data, status, headers, config) {
            // log error
            });

    }

    $scope.pagingButtons  = function(data){
      if(data.hasOwnProperty("paging")) {
        $scope.page = data.paging;
        if($scope.page.hasOwnProperty("previous")){
          $scope.prevPresent = true;
        }
        else {
          $scope.prevPresent = false;
        }
        if($scope.page.hasOwnProperty("next"))
          $scope.nextPresent = true;
        else {
          $scope.nextPresent = false;
        }
      }
      else {
        $scope.prevPresent = false;
        $scope.nextPresent = false;
      }
    }

    $scope.showTab = function(clickedid) {
      console.log("tableData is " + clickedid);
      $scope.states.activeItem = clickedid;
      $scope.favTable = false;
      $scope.secondPage = false;
      if(clickedid === 'place') {
        $scope.tableData = $scope.placeData;
        $scope.pagingButtons($scope.tableData);
      }
      else if(clickedid === 'user') {
        $scope.tableData = $scope.userData;
        $scope.pagingButtons($scope.tableData);
      }
      else if(clickedid === 'event') {
        $scope.tableData = $scope.eventData;
        $scope.pagingButtons($scope.tableData);
      }
      else if(clickedid === 'group') {
        $scope.tableData = $scope.groupData;
        $scope.pagingButtons($scope.tableData);
      }
      else if(clickedid === 'page') {
        $scope.tableData = $scope.pageData;
        $scope.pagingButtons($scope.tableData);
      }
      else if(clickedid === 'fav') {
        $scope.favTable = true;
        $scope.secondPage = false;
        if (typeof(Storage) !== "undefined") {
            if (localStorage.getItem("favorites") === null) {
            }
            else {
              var retrievedObject = localStorage.getItem('favorites');
              $scope.favArr = JSON.parse(retrievedObject);
            }
        } else {
            $scope.testItem = "Sorry, your browser does not support Web Storage...";
        }
      }
    }


    $scope.isLoaded = function() {
      //console.log("disappear test " + ($scope.userTable && $scope.pageTable && $scope.eventTable && $scope.groupTable && $scope.placeTable && !$scope.favTable && !$scope.secondPage));
      return ($scope.userTable && $scope.pageTable && $scope.eventTable && $scope.groupTable && $scope.placeTable && !$scope.favTable && !$scope.secondPage);
    }

    $scope.changData = function(clicked, offs) {
      var url;
      if(clicked == 'place') {
        url = 'getdata.php?req=1&keyw=' + $scope.keyword + '&typ=place&center=' + $scope.latt + ',' + $scope.long + '&offset=' + offs;
      }
      else {
        url = 'getdata.php?req=1&keyw=' + $scope.keyword + '&typ=' + clicked + '&offset=' + offs
      }
      console.log(url);
      $http.get(url).
            success(function(data, status, headers, config) {
              if(clicked == 'place') {
                $scope.placeData = data;
              }
              else if(clicked == 'page') {
                $scope.pageData = data;
              }
              else if(clicked == 'event') {
                $scope.eventData = data;
              }
              else if(clicked == 'group') {
                $scope.groupData = data;
              }
              else if(clicked == 'user') {
                $scope.userData = data;
              }
              $scope.showTab(clicked);
            }).
            error(function(data, status, headers, config) {
            // log error
            });
    }

    $scope.changeData = function(clicked, url) {
      console.log(url);
      /*if(clicked == 'place') {
        url = 'getdata.php?req=1&keyw=' + $scope.keyword + '&typ=place&center=' + $scope.latt + ',' + $scope.long + '&offset=' + offs;
      }
      else {
        url = 'getdata.php?req=1&keyw=' + $scope.keyword + '&typ=' + clicked + '&offset=' + offs
      }
      console.log(url);*/
      $http.get(url).
            success(function(data, status, headers, config) {
              if(clicked == 'place') {
                $scope.placeData = data;
              }
              else if(clicked == 'page') {
                $scope.pageData = data;
              }
              else if(clicked == 'event') {
                $scope.eventData = data;
              }
              else if(clicked == 'group') {
                $scope.groupData = data;
              }
              else if(clicked == 'user') {
                $scope.userData = data;
              }
              $scope.showTab(clicked);
            }).
            error(function(data, status, headers, config) {
            // log error
            });
    }

    $scope.openTab = function() {
      $http.get("https://graph.facebook.com/v2.8/1084855054970797/picture?redirect=false&access_token=EAAXbZBNb7RzMBAGaC38bR3xW0BKS2SKTJwKuyg8RpNkwCx1JFQySthvxjHygReDgNAKpg4H5XcjXDJ5UBSXYZBpQuXOFtmwSs4qZCrrCFlI5E5MEIIh8SR3ulTnbRtNhhbZCbkaPqQaFuzYlQ43UarsPB1x0IlYZD").
            success(function(data, status, headers, config) {
              $scope.alpicURL = data.data.url;
              console.log($scope.alpicURL);
            }).
            error(function(data, status, headers, config) {
            // log error
            });
    }

    $scope.searchRequest = function(clickedid, offs, lim) {
      console.log("Entered searchRequest");
      offs = (typeof offs !== 'undefined') ?  offs : 0;
      lim = (typeof lim !== 'undefined') ?  lim : 0;
      $scope.offset = offs;
      $scope.searchPro = true;
      $scope.keyword = $scope.keyword.trim();
      $scope.states.activeItem = clickedid;
      if(clickedid != 'fav') {
          $scope.userTable = false;
          $scope.pageTable = false;
          $scope.eventTable = false;
          $scope.groupTable = false;
          $scope.placeTable = false;
          function success(pos) {
            var crd = pos.coords;
            $scope.latt = crd.latitude;
            $scope.long = crd.longitude;
            console.log('getdata.php?req=3&keyw=' + $scope.keyword + '&typ=place&center=' + crd.latitude + ',' + crd.longitude + '&offset=' + offs);
            $http.get('getdata.php?req=3&keyw=' + $scope.keyword + '&typ=place&center=' + crd.latitude + ',' + crd.longitude + '&offset=' + offs).
              success(function(data1, status, headers, config) {
                $scope.placeTable = true;
                $scope.placeData = data1;
                //$scope.pagingButtons(data);
                $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=user&offset=' + $scope.offset).
                  success(function(data2, status, headers, config) {
                    $scope.userTable = true;
                    $scope.userData = data2;
                    console.log(data2);
                    //$scope.pagingButtons(data);
                    $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=event&offset=' + $scope.offset).
                        success(function(data3, status, headers, config) {
                          $scope.eventTable = true;
                          $scope.eventData = data3;
                          //$scope.pagingButtons(data);
                          $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=page&offset=' + $scope.offset).
                                success(function(data4, status, headers, config) {
                                  $scope.pageTable = true;
                                  $scope.pageData = data4;
                                  //$scope.pagingButtons(data);
                                  $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=group&offset=' + $scope.offset).
                                        success(function(data5, status, headers, config) {
                                          $scope.searchPro = false;
                                          $scope.groupTable = true;
                                          $scope.groupData = data5;
                                          //$scope.pagingButtons(data);
                                          $scope.showTab($scope.states.activeItem);
                                        }).
                                        error(function(data, status, headers, config) {
                                        // log error
                                        });
                                }).
                                error(function(data, status, headers, config) {
                                // log error
                                });
                        }).
                        error(function(data, status, headers, config) {
                          // log error
                        });

                  }).
                  error(function(data, status, headers, config) {
                    // log error
                  });
              }).
              error(function(data, status, headers, config) {
                // log error
              });
          };
          function error(err) {
            $http.get('getdata.php?req=3&keyw=' + $scope.keyword + '&typ=place&center=34.022013, -118.289205&offset=' + offs).
              success(function(data1, status, headers, config) {
                $scope.placeTable = true;
                $scope.placeData = data1;
                //$scope.pagingButtons(data);
                $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=user&offset=' + $scope.offset).
                  success(function(data2, status, headers, config) {
                    $scope.userTable = true;
                    $scope.userData = data2;
                    console.log(data2);
                    //$scope.pagingButtons(data);
                    $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=event&offset=' + $scope.offset).
                        success(function(data3, status, headers, config) {
                          $scope.eventTable = true;
                          $scope.eventData = data3;
                          //$scope.pagingButtons(data);
                          $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=page&offset=' + $scope.offset).
                                success(function(data4, status, headers, config) {
                                  $scope.pageTable = true;
                                  $scope.pageData = data4;
                                  //$scope.pagingButtons(data);
                                  $http.get('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=group&offset=' + $scope.offset).
                                        success(function(data5, status, headers, config) {
                                          $scope.searchPro = false;
                                          $scope.groupTable = true;
                                          $scope.groupData = data5;
                                          //$scope.pagingButtons(data);
                                          $scope.showTab($scope.states.activeItem);
                                        }).
                                        error(function(data, status, headers, config) {
                                        // log error
                                        });
                                }).
                                error(function(data, status, headers, config) {
                                // log error
                                });
                        }).
                        error(function(data, status, headers, config) {
                          // log error
                        });

                  }).
                  error(function(data, status, headers, config) {
                    // log error
                  });
              }).
              error(function(data, status, headers, config) {
                // log error
              });
          };
          navigator.geolocation.getCurrentPosition(success, error);
          $scope.secondPage = false;
          $scope.favTable = false;
          console.log("hey" + clickedid);
          console.log("keyword is" + $scope.keyword);
          //console.log('getdata.php?req=1&keyw=' + $scope.keyword + '&typ=' + $scope.states.activeItem + '&offset=' + $scope.offset);

        }

    }

    $scope.delFav = function(idVal) {
      if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("favorites") === null) {
        }
        else {
          var retrievedObject = localStorage.getItem('favorites');
          //console.log("isFav has elements");
          //console.log(retrievedObject);
          var favoriteArr = JSON.parse(retrievedObject);
          for(var i = 0; i < favoriteArr.length; i++) {
            if(favoriteArr[i].id == idVal) {
              favoriteArr.splice(i, 1);
            }
          }
          localStorage.setItem('favorites', JSON.stringify(favoriteArr));
        }
      } else {
        $scope.testItem = "Sorry, your browser does not support Web Storage...";
      }
    }
    $scope.isFav = function(idVal) {
      if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("favorites") === null) {
          return false;
        }
        else {
          var retrievedObject = localStorage.getItem('favorites');
          //console.log("isFav has elements");
          //console.log(retrievedObject);
          var favoriteArr = JSON.parse(retrievedObject);
          for(var i = 0; i < favoriteArr.length; i++) {
            if(favoriteArr[i].id == idVal) {
              return true;
            }
          }
          return false;
        }
      } else {
        $scope.testItem = "Sorry, your browser does not support Web Storage...";
      }
    }
    $scope.setFav = function(idVal, nameVal, typeVal, URLVal) {
      console.log("enter fav function");
      if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("favorites") === null) {
          console.log("empty now");
          $scope.favArr = [];
          var newObj = {
              id: idVal,
              name: nameVal,
              type: typeVal,
              imgURL: URLVal
          };
          $scope.favArr.push(newObj);
          console.log($scope.favArr);
          localStorage.setItem('favorites', JSON.stringify($scope.favArr));
        }
        else {
          var retrievedObject = localStorage.getItem('favorites');
          console.log("has elements");
          $scope.favArr = JSON.parse(retrievedObject);
          var newObj = {
              id: idVal,
              name: nameVal,
              type: typeVal,
              imgURL: URLVal
          };
          $scope.favArr.push(newObj);
          console.log($scope.favArr);
          localStorage.setItem('favorites', JSON.stringify($scope.favArr));
          //localStorage.removeItem('favorites');
        }
      } else {
        $scope.testItem = "Sorry, your browser does not support Web Storage...";
      }
    }
    $scope.deleteFav = function(index) {
      console.log("fdve");
      if (typeof(Storage) !== "undefined") {
        if (localStorage.getItem("favorites") === null) {
          console.log("");
        }
        else {
          var retrievedObject = localStorage.getItem('favorites');
          console.log("del when has elements");
          $scope.favArr = JSON.parse(retrievedObject);
          $scope.favArr.splice(index, 1);
          console.log($scope.favArr);
          localStorage.setItem('favorites', JSON.stringify($scope.favArr));
          //localStorage.removeItem('favorites');
        }
      } else {
        $scope.testItem = "Sorry, your browser does not support Web Storage...";
      }
    }
    $scope.prev = function() {
      $scope.changeData($scope.states.activeItem,$scope.tableData.paging.previous);
      /*if($scope.states.activeItem == 'user'){
        $scope.userOff = $scope.userOff - 25;
        $scope.changeData($scope.states.activeItem,$scope.userOff);
      }
      else if($scope.states.activeItem == 'page'){
        $scope.pageOff = $scope.pageOff - 25;
        $scope.changeData($scope.states.activeItem,$scope.pageOff);
      }
      else if($scope.states.activeItem == 'event'){
        $scope.eventOff = $scope.eventOff - 25;
        $scope.changeData($scope.states.activeItem,$scope.eventOff);
      }
      if($scope.states.activeItem == 'group'){
        $scope.groupOff = $scope.groupOff - 25;
        $scope.changeData($scope.states.activeItem,$scope.groupOff);
      }
      if($scope.states.activeItem == 'place'){
        $scope.placeOff = $scope.placeOff - 25;
        $scope.changeData($scope.states.activeItem,$scope.placeOff);
      }*/
    }
    $scope.next = function () {
      $scope.changeData($scope.states.activeItem,$scope.tableData.paging.next);
      /*if($scope.states.activeItem == 'user'){
        $scope.userOff = $scope.userOff + 25;
        $scope.changeData($scope.states.activeItem,$scope.userData.paging.next);
      }
      else if($scope.states.activeItem == 'page'){
        $scope.pageOff = $scope.pageOff + 25;
        $scope.changeData($scope.states.activeItem,$scope.pageOff);
      }
      else if($scope.states.activeItem == 'event'){
        $scope.eventOff = $scope.eventOff + 25;
        $scope.changeData($scope.states.activeItem,$scope.eventOff);
      }
      if($scope.states.activeItem == 'group'){
        $scope.groupOff = $scope.groupOff + 25;
        $scope.changeData($scope.states.activeItem,$scope.groupOff);
      }
      if($scope.states.activeItem == 'place'){
        $scope.placeOff = $scope.placeOff + 25;
        $scope.changeData($scope.states.activeItem,$scope.placeOff);
      }*/
    }
    $scope.genAlposts = function(idVal) {
      $scope.Alprog = true;
      $scope.Poprog = true;
      //$scope.searchHeader = false;
      $scope.secondPage = true;
      $scope.favTable = false;
      console.log("id is " + idVal);
      console.log('getdata.php?req=2&id=' + idVal);
      $http.get('getdata.php?req=2&id=' + idVal).
          success(function(data, status, headers, config) {
            $scope.Alprog = false;
            $scope.Poprog = false;
            $scope.curId = idVal;
            if(data.hasOwnProperty("picture")) {
              $scope.Postpic = data.picture.data.url;
            }
            $scope.Postname = data.name;
            if(data.hasOwnProperty("albums")) {
              $scope.Alpresent = true;
              $scope.albums = data.albums.data;
            }
            else {
              $scope.Alpresent = false;
            }
            if(data.hasOwnProperty("posts")) {
              $scope.Popresent = true;
              $scope.posts = data.posts.data;
            }
            else {
              $scope.Popresent = false;
            }
          }).
          error(function(data, status, headers, config) {
            // log error
      });
    }
    $scope.postToFb = function(pic, nameV) {
      FB.init({
        appId: '1649236688717619',
        xfbml: true,
        version: 'v2.6'
      });
      FB.ui({
        app_id: '1649236688717619',
        method: 'feed',
        //link: 'https://developers.facebook.com/docs/',
        name: nameV,
        picture: pic,
        caption: 'FB SEARCH FROM USC CSCI571',
        }, function(response){
        if (response && !response.error_message) {
          console.log('Posted !!!!');
          window.alert('Posted Successfully');
        }
        else {
          window.alert('Not posted');
        }
        });
    }
    /*$http.get('getdata.php?req=1').
      success(function(data, status, headers, config) {
        $scope.tableData = data.data;
      }).
      error(function(data, status, headers, config) {
        // log error
      });
    $http.get('getdata.php?req=2&id=124984464200434').
        success(function(data, status, headers, config) {
          $scope.Postpic = data.picture.data.url;
          $scope.Postname = data.name;
          $scope.albums = data.albums.data;
          $scope.posts = data.posts.data;
        }).
        error(function(data, status, headers, config) {
          // log error
    });*/
});
