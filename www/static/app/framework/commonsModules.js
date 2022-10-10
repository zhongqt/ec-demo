define('framework/commonsModules', [
    'framework/commons/GlobalHttpExceptionHandler',
    'framework/commons/GillionResource',
    'framework/directive/GillionDirectiveModule',
    'framework/utils/UtilsModule',
    'framework/filters/GillionGlobalFiltersModule',
    'framework/control/GillionControlDirectiveModule',
    'framework/permit/GillionPermitModule',
    'framework/commons/GillionScopeModule',
    'framework/interceptors/GlobalInterceptorModule',
    'framework/commons/ItemBinderModule',
    'framework/tabindex/TabindexModule'
], function () {
    return ['GlobalHttpExceptionHandler', 'TabindexModule', 'GillionResource', 'GillionDirectiveModule', 'UtilsModule', 'GillionGlobalFiltersModule', 'GillionControlDirectiveModule', 'GillionPermitModule', 'GillionScopeModule', 'GlobalInterceptorModule', 'ItemBinderModule'];
});