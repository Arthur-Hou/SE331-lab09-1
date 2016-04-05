(function() {
  'use strict';

  angular
    .module('App')
    .config(configTranslation)
    .config(configCompilerProvider)
    .config(configFlowFactoryProvider);

  /** @ngInject */
  function configTranslation($translateProvider) {
    // Enable log
    $translateProvider.useUrlLoader('http://localhost:8080/messageBundle');
    $translateProvider.useStorage('UrlLanguageStorage');
    $translateProvider.preferredLanguage('en');
    $translateProvider.fallbackLanguage('en');
  }

  function  configFlowFactoryProvider(flowFactoryProvider){
    flowFactoryProvider.default ={
      target:'',
      permanentErrors:[500,501],
      maxChunkRetries:1,
      chunkRetryInterval:5000,
      simultaneousUploads:4,
      singleFile:false
    };
  }

  function configCompilerProvider($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|chrome-extension):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data):/);
  }

})();
