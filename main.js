var isDown = false;
var rightIsDown = false;
$('.mapeditor').mousedown(function() {
    switch (event.which) {
        case 1:
            isDown = true; 
            break;
        case 2:
            // rightIsDown = true;
            break;
        case 3:
            // isDown = true; 
            rightIsDown = true;
            break;
        // default:
            // alert('You have a strange mouse');
    }      // When mouse goes down, set isDown to true
  })
  .mouseup(function() {
    isDown = false;    // When mouse goes up, set isDown to false
    rightIsDown = false;
  });

var tileEditor = angular.module('tileEditor', [])

tileEditor.directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {            
          function into(input) {
            return JSON.parse(input);
          }
          function out(data) {
            element.val(JSON.stringify(data));
            // return JSON.stringify(data);
          }
          scope.$watch('data', function(val){
            out(val);
          }, true);
          ngModel.$parsers.push(into);
          ngModel.$formatters.push(out);
        }
    };
})
tileEditor.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});


tileEditor.controller('interfaceCtrl', ['$scope', function($scope){
  $scope.tileSize = {w: 16, h: 16};
  $scope.mapSize = {w: 100, h: 14};
  $scope._tileSize = {w: 16, h: 16};
  $scope._mapSize = {w: 100, h: 14};

  $scope.current = '1'
  $scope.swatches = {'1': 'green'};

  $scope.data = [];
  $scope.range = function(num){
    return _.range(num);
  };
  $scope.generate = function(){
    $scope.data = [];
    console.log('Generate');
    var tileSize = $scope.tileSize;
    var mapSize = $scope.mapSize;
    $scope._tileSize = _.clone(tileSize);
    $scope._mapSize = {
      w: _.range(mapSize.w),
      h: _.range(mapSize.h)
    };
    $scope.generateMapArray();
  };

  $scope.generateMapArray = function() {
    for(var i = 0; i < $scope._mapSize.h.length; i++){
      var tempArray = [];
      for(var z = 0; z < $scope._mapSize.w.length; z++){
        tempArray.push(0);
      }
      $scope.data.push(tempArray);
    }
  };
  $scope.generate();

  $scope.changeCell = function($event, row, column) {
    // console.log(isDown, $event)
    if($event.type == 'click' || isDown){
      $scope.data[row][column] = parseInt($scope.current);
    }
    if($event.type == 'contextmenu' || rightIsDown){
      $scope.data[row][column] = '';
    }
  };

}]);

