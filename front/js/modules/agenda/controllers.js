(function(angular){
'use strict';

// Helpers
var _contact = {
  removeItem: function (arr, item){
    var index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
  },
  cbFindSuccess: function (data, $scope) {
      $scope.contacts = data.data;
      $scope.message = 'List complete';
      console.log(data);
  },
  cbFindError: function (error, $scope) {
      $scope.status = 'Unable to load contacts: ' + error.message;
  },
  cbCreateSuccess: function (data, $scope) {
      $scope.contact = data.data;
      $scope.message = 'Contact ' + $scope.contact.name + '  created successfully!';
  },
  cbCreateError: function (error, $scope) {
      $scope.status = 'Unable to create contact: ' + error.message;
  },
  cbUpdateSuccess: function (data, $scope) {
      // $scope.contact = data.data;
      $scope.message = 'Contact ' + $scope.contact.name + '  update successfully!';
  },
  cbUpdateError: function (error, $scope) {
      $scope.status = 'Unable to create contact: ' + error.message;
  },
  cbShowSuccess: function (data, $scope) {
    console.log('Show: ', data);
      $scope.contact = data.data;
      $scope.message = 'Contact ' + $scope.contact.name + '  retrieved successfully!';
  },
  cbShowError: function (error, $scope) {
      $scope.status = 'Unable to retrieve contact: ' + error.message;
  }
};

// Controllers 
angular.module('myApp.modules.Contact.controllers', []).
  controller('AppController', 
    ['$scope', '$http',
    function ($scope, $http) {

    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!';
    });

  }]).
  controller('RemoveContact', 
    ['$scope', '$http', 'ContactService', 
    function ($scope, $http, ContactService) {
      var Contact = ContactService;
    
      $scope.remove = function(contact){
        if(confirm('Are you sure? Contact '+contact.name+' will be removed.')){
          Contact.remove(contact).
          success(function (data) {
            _contact.removeItem($scope.contacts, contact);
          }).
          error(function (error) {
              $scope.status = 'Unable to load contacts: ' + error.message;
          });

        }
    };
  }]).
  controller('ContactCreateController', 
    ['$scope', '$http', 'ContactService',
    function ($scope, $http, ContactService) {

      var Contact = ContactService;

      $scope.message = 'Fill the form bellow';

      $scope.create = function (contact){
        Contact.create(contact).then(
          function (data){
          _contact.cbCreateSuccess(data, $scope);
        }, function(err){
          _contact.cbCreateError(err, $scope); 
        });
      };

  }]).
  controller('ContactListController', 
    ['$scope', '$http', 'ContactService', 
    function ($scope, $http, ContactService) {

      var Contact = ContactService;
      Contact.find().then(function(data){
        _contact.cbFindSuccess(data, $scope);
      }, function(err){
        _contact.cbFindError(err, $scope);
      });

  }]).
  controller('ContactShowController', 
    ['$scope', '$http', '$routeParams', '$location', 'ContactService',
    function ($scope, $http, $routeParams, $location, ContactService) {

      var id = $routeParams.id;
      var url = 'api/contacts/_id/'+id;
      var method = 'GET';

      $scope.message = 'Show Contact';

      var Contact = ContactService;
      Contact.findOne(id).then(function(data){
        _contact.cbShowSuccess(data, $scope);
      }, function(err){
        _contact.cbShowError(err, $scope);
      });

      $scope.remove = function(contact){
        var id = contact._id;
        var url = 'api/contacts/'+id;
        var method = 'DELETE';

        $http({
          url: url,
          method: method
        }).
        success(function(data){
          console.log(data);
          $scope.contact = data;
          $scope.message = 'Contact ' +contact.name+ 'removed successfully!';
          $location.path('/contacts');
        }).
        error(function(err){
          console.log(err);
          $scope.message = 'Contact cant be removed!';
        });
      };

  }]).
  controller('ContactEditController', 
    ['$scope', '$http', '$routeParams', 'ContactService',
    function ($scope, $http, $routeParams, ContactService) {

      var id = $routeParams.id;
      var url = 'api/contacts/_id/'+id;

      var Contact = ContactService;
      Contact.findOne(id).then(function(data){
        _contact.cbShowSuccess(data, $scope);
      }, function(err){
        _contact.cbShowError(err, $scope);
      });

      $scope.update = function(contact){

        Contact.update(contact).then(function(data){
          _contact.cbUpdateSuccess(data, $scope);
        }, function(err){
          _contact.cbUpdateError(err, $scope);
        });

      };
  }]).
  controller('ContactRemoveController', ['$scope', '$http', '$routeParams',
    function ($scope, $http, $routeParams) {
    $scope.title = 'Workshop Be MEAN';

    var method = 'GET';
    var id = $routeParams.id;
    var url = '/api/contacts/_id/'+id;
    $http({
      method: method,
      url: url
    })
    .success(function(data){
      $scope.contact = data;
      $scope.msg = 'About ' + $scope.contact.name;
    })
    .error(function(data){
      $scope.msg = 'Error in get contact';
    });

    $scope.remove = function(cerveja){
      var method = 'DELETE';
      var url = '/api/contacts/_id/'+cerveja._id;
      console.log(url);
      if(confirm('Are you sure?')){
        $http({
          method: method,
          url: url
        })
        .success(function(data){
          $scope.msg = 'Contact ' +cerveja.name+ ' deleted successfully';
        })
        .error(function(data){
          $scope.msg = 'ERROR on DELETE';
        });

      }
    };

  }]);
})(angular);
