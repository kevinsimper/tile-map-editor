var tileEditor = angular.module('tileEditor', [])

tileEditor.controller('interfaceCtrl', ['$scope', function($scope){
  $scope.tileSize = {w: 16, h: 16};
  $scope.mapSize = {w: 100, h: 14};

  $scope.range = function(num){
    return _.range(num);
  }
}]);