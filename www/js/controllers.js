angular.module('Thyme.controllers', [])


.controller('Main', function($scope,$timeout, $cordovaSQLite,$ionicPopup,$ionicLoading, $state,$stateParams,$ionicHistory) {
    $scope.insert = function(className, room, time, day, type, lecturer) {
        var query = "INSERT INTO time (className, room, time, day, type, lecturer) VALUES (?,?,?,?,?,?)";
        $cordovaSQLite.execute(db, query, [className, room, time, day, type, lecturer]).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            // $ionicPopup.alert({
            //                    title: 'Class Added'
            //                    // template: "Try Again"
            // });
            // $state.go();
            // $state.go("app.view", {}, {reload: true});
            $ionicHistory.nextViewOptions({
              disableBack: true
            });
            $state.go("app.view");
            $scope.load();
            // $scope.load();
        }, function (err) {
            console.log(err);
            $ionicPopup.alert({
                               title: 'Error',
                               template: "Try Again"
            });
        });
    }
    $scope.callIt = function(id) {
       var confirmPopup = $ionicPopup.confirm({
         title: 'Delete Class?',
         template: 'Are you sure you want to delete this class?'
       });

       confirmPopup.then(function(res) {
         if(res) {
           $scope.delete(id);
           // $ionicPopup.alert({
           //                     title: 'Class Deleted'
           //                     // template: "Try Again"
           //  });
           $scope.load();
         } else {
          console.log("AAHHHH");
         }
       });
     };

    $scope.delete = function(id){
      console.log(id);
      var query = "DELETE FROM time WHERE id = '"+id+"'";
      $cordovaSQLite.execute(db, query, []).then(function(results) {
        console.log("Deleted");
      }, function (err) {
          console.error(err);
      });
    }

    $scope.load = function () {
      $scope.show();
      $timeout(function() {
        
      console.log("load");
      // $state.transitionTo($state.current, $stateParams, {
      //     reload: true,
      //     inherit: false,
      //     notify: true
      // });
      var query = "SELECT * from time";
      $scope.output = [];
      $cordovaSQLite.execute(db, query,[]).then(function(res){
        for (var i = 0; i < res.rows.length; i++) {
          $scope.output.push(res.rows.item(i));
          // console.log(res.rows.item(i));
        }
      });
      console.log($scope.output);
      // return output;
    },1500).then(function(){
     $scope.hide();

    });
  }

   $scope.show = function() {
    $ionicLoading.show({
      template: '<p>Loading...</p><ion-spinner></ion-spinner>'
    });
  };

  $scope.hide = function(){
        $ionicLoading.hide();
  };
      // $scope.load();
  
});

