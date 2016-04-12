(function() {
'use strict';

angular
  .module('app')
  .controller('shoppingCartController',ShoppingCartController);

  /** @ngInject */
    function ShoppingCartController($scope, shoppingCartService, $location, $rootScope,$rootParams) {
        var id = $rootParams.id;
        var vm =this;
        shoppingCartService.get({id:id},function(data){
            vm.cart = data;
        })

        $scope.$on('$locationChangeStart', function (event) {
            $rootScope.cartUpdateSuccess = false;

        });

        vm.updateCart = function () {
            shoppingCartService.update({id:id},$scope.cart,function(){
                $rootScope.cartUpdateSuccess = true;

            });
        }

        vm.totalEach = function(index){
            return $scope.cart.selectedProducts[index].product.totalPrice * $scope.cart.selectedProducts[index].amount;
        }

        vm.total = function(){
            var total = 0;
            angular.forEach($scope.cart.selectedProducts, function(item) {
                total += item.amount * item.product.totalPrice;
            })

            return total;
        }
    }
})();
