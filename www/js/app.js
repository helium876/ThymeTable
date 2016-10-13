var db = null;

angular.module('Thyme', ['ionic','ngCordova','Thyme.controllers'])

.run(function($ionicPlatform,$cordovaSQLite,$timeout) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if(window.cordova) {
    //   // App syntax
      // db = $cordovaSQLite.openDB("mydb"); //for the device
      // $timeout(function() {
        db = $cordovaSQLite.openDB({ name: 'mydb', location: 2, createFromLocation: 1});
      // }, 100);
    } else {
    //   // Ionic serve syntax
      db = window.openDatabase("my.db", "1", "My", -1);// to test in the browser
    }

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS time (id integer primary key, className text, room text, time text, day text, type text, lecturer text)");

  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
  $ionicConfigProvider.views.maxCache(0);
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'Main'
  })

  .state('app.add', {
      url: '/add',
      views: {
        'menuContent': {
          templateUrl: 'templates/add.html'
        }
      }
    })
    .state('app.view', {
      url: '/view',
      views: {
        'menuContent': {
          templateUrl: 'templates/view.html',
          controller: 'Main'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/view');
});
