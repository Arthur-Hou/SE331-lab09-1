/**
 * Created by Asa on 4/5/2016.
 */

/** @ngInject */
function listProductController($scope,$rootScope,productService,$route,queryProductService){
  var vm=this;
  //$http.get("/product/").success(function (data)){
  vm.queryPromise = productService.query(function (data){
    //$scope.totalNetPrice = totalCalService.getTotalNetPrice(data);
    vm.products = data;
  }).$promise;

  $scope.$on('locatioanChangeStart',function(){
    $rootScope.addSuccess = false;
    $rootScope.editSuccess = false;
    $rootScope.deleteSuccess = false;
  });

  vm.deleteProduct = function (id){
    var answer = confirm("Do you want to delete the product?");
    if (answer){
      productService.deleteProduct({id:id},function(){
        $rootScope.deleteSuccess = true;
        $route.reload();
      })
    }
  }

  vm.searchProduct = function(name){
    queryProductService.query({name:name},function(data){
      vm.products = data;
    });
  }
}
