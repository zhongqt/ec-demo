define('framework/pagination/GillionPaginationNaviDirectiveConstructor', [
    'angular',
    'config.properties'
], function (angular, config) {
    var ControlMode = {
        CUSTOM_CONTROL_MODE:{
            renderPageStyle:function(pageNum){
                var firstBtn = this.element.find(".pager-btn-first"),
                    prevBtn = this.element.find(".pager-btn-prev"),
                    currentPageInput = this.element.find("#input-current-page-"+this.scope.sourceName),
                    nextBtn = this.element.find(".pager-btn-next"),
                    lastBtn = this.element.find(".pager-btn-last"),
                    refreshBtn = this.element.find(".pager-btn-refresh");

                if(this.scope.disabled){
                    firstBtn.attr("disabled","disabled");
                    prevBtn.attr("disabled","disabled");
                    currentPageInput.attr("disabled","disabled");
                    nextBtn.attr("disabled","disabled");
                    lastBtn.attr("disabled","disabled");
                    refreshBtn.attr("disabled","disabled");
                }else{
                    ControlMode.DEFAULT_CONTROL_MODE.renderPageStyle.call(this,pageNum)
                }
            }
        },
        DEFAULT_CONTROL_MODE:{
            renderPageStyle:function(pageNum){
                var firstBtn = this.element.find(".pager-btn-first"),
                    prevBtn = this.element.find(".pager-btn-prev"),
                    currentPageInput = this.element.find("#input-current-page-"+this.scope.sourceName),
                    nextBtn = this.element.find(".pager-btn-next"),
                    lastBtn = this.element.find(".pager-btn-last"),
                    refreshBtn = this.element.find(".pager-btn-refresh");

                if(pageNum === undefined){
                    firstBtn.attr("disabled","disabled");
                    prevBtn.attr("disabled","disabled");
                    currentPageInput.attr("disabled","disabled");
                    nextBtn.attr("disabled","disabled");
                    lastBtn.attr("disabled","disabled");
                    refreshBtn.attr("disabled","disabled");
                    return;
                }

                if (pageNum == 1) {
                    firstBtn.attr("disabled", "disabled");
                    prevBtn.attr("disabled", "disabled");
                    currentPageInput.removeAttr("disabled");
                    nextBtn.removeAttr("disabled");
                    lastBtn.removeAttr("disabled");
                }
                if (pageNum > 1) {
                    firstBtn.removeAttr("disabled");
                    prevBtn.removeAttr("disabled");
                    currentPageInput.removeAttr("disabled");
                    nextBtn.removeAttr("disabled");
                    lastBtn.removeAttr("disabled");
                }
                if (this.scope.showTotal) {
                    if (pageNum == this.scope.totalPage || this.scope.totalPage == 0) {
                        nextBtn.attr("disabled", "disabled");
                        lastBtn.attr("disabled", "disabled");
    
                    }
                    if (pageNum < this.scope.totalPage) {
                        nextBtn.removeAttr("disabled");
                        lastBtn.removeAttr("disabled");
                    }
                } else {
                    var isLastPage = (this.scope.recordTo - this.scope.recordFrom + 1) < this.scope.pageSize;
                    nextBtn.attr('disabled', isLastPage);
                }
            }
        }
    }

    return function ($parse, $dataSourceManager, $timeout, $document) {

        var Pagination = function ($scope, $element, $attrs) {
            var me = this;
            me.scope = $scope;
            me.element = $element;
            me.attrs = $attrs;
        }

        Pagination.prototype.setPageSizeList = function (pageSizeList) {
            if (angular.isArray(pageSizeList)) {
                this.scope.pageSizeList = pageSizeList;
            } else if (pageSizeList) {
                this.scope.pageSizeList = pageSizeList.split(',');
            } else {
                this.scope.pageSizeList = [5, 10, 20, 30, 50];
            }

        }

        Pagination.prototype.initDataSource = function () {
            var me = this,
                scope = me.scope;
            scope.$on(scope.sourceName, function (context, dataSource) {
                if(!dataSource.groups){
                    var disabledRefresh = !(dataSource.records && dataSource.records.length); 
                    if(disabledRefresh){
                        $("#btn-page-refresh-"+dataSource.sourceName).attr("disabled",disabledRefresh);
                        $("#btn-show-total-"+dataSource.sourceName).attr("disabled",disabledRefresh);
 
                    }else{
                        $("#btn-page-refresh-"+dataSource.sourceName).removeAttr("disabled") ;
                        $("#btn-show-total-"+dataSource.sourceName).removeAttr("disabled") ;
                    }
                    if(!me.action && !dataSource.action){
                        scope.fetchTotalStatus = 0;
                    }
                    scope.totalRecord = dataSource.totalRecord || 0;
                    scope.pageSize = dataSource.pageSize || 0;
                    scope.currentPage = dataSource.currentPage || 1;
    
                    scope.dataSource = dataSource.records;
                    if(scope.showTotal){
                        scope.totalPage = dataSource.totalPage || 0;
                    }
                    
    
                    scope.recordFrom = (dataSource.currentPage - 1) * dataSource.pageSize + 1;
                    if (dataSource.records) {
                        var summaryRow = 0;
                        if (dataSource.records.length > 0 && dataSource.records[dataSource.records.length - 1].__SUMMARY_ROW) {
                            summaryRow = 1;
                        }
                        scope.recordTo = scope.recordFrom + dataSource.records.length - 1 - summaryRow;
                        if (scope.showTotal && scope.recordFrom + dataSource.records.length - 1 > scope.totalRecord) {
                            scope.recordTo = scope.totalRecord;
                        }
                        if (scope.recordFrom > scope.recordTo) {
                            scope.recordFrom = scope.recordTo;
                        }
                    } else {
                        scope.recordFrom = 0;
                        scope.recordTo = scope.recordFrom;
                    }
                    me.pageStyle(scope.currentPage);
    
                    me.action = "";
                    dataSource.action = "";
    
                    if (!scope.$root.$$phase) {
                        scope.$digest();
                    }
                }
                
            });
        }

        Pagination.prototype.refresh = function () {
            var params,
                me = this,
                scope = this.scope;
            
            if($dataSourceManager.dataSources[scope.sourceName].records && $dataSourceManager.dataSources[scope.sourceName].records.length){
                if (angular.isFunction($dataSourceManager.dataSources[scope.sourceName].params)) {
                    params = $dataSourceManager.dataSources[scope.sourceName].params;
                } else {
                    params = angular.extend({}, $dataSourceManager.dataSources[scope.sourceName].params || {});
                }
                me.action = "refresh";
                $dataSourceManager.dataSources[scope.sourceName].doRequestData(null, params, function (_dataSource) {
                });
            }
            


        }

        Pagination.prototype.goPage = function (pageNum) {
            if (Number(pageNum)) {
                var scope = this.scope;
                if (scope.onBeforeChangePage() !== false) {
                    //$dataSourceManager.dataSources[scope.sourceName].currentPage=pageNum;
                    $dataSourceManager.dataSources[scope.sourceName].doRequestData(pageNum);
                    //this.initDataSource();
                    this.pageStyle(pageNum);
                }
            }
        }

        return {
            scope: {
                sourceName: '@',
                refreshable: '@',
                onBeforeChangePage: '&',
                disabled:'='
            },
            replace: true,
            template: '<div class="pager pager-skin-tp">' +
                '<button id="btn-page-first-{{sourceName}}" ng-if="showTotal" type="button" class="btn pager-btn-first" ng-click="firstPage()" ><i class="fi fi-first"></i></button>' +
                '<button id="btn-page-prev-{{sourceName}}" type="button" class="btn pager-btn-prev" ng-click="previousPage()"><i class="fi fi-prev"></i></button>' +
                ($config.i18nInfo.beforeCurrentPage ? '<span class="pager-desc">' + $config.i18nInfo.beforeCurrentPage + ' </span>' : '') +
                '<input id="input-current-page-{{sourceName}}" type="text" g-dbc g-numeric  ng-disabled="disabled" ng-change="verifyNum(oldVal,newVal)" class="form-text pager-index" ng-model="currentPage">' +
                '<span class="pager-desc"><span id="span-totalpage-{{sourceName}}" ng-if="showTotal">/ {{totalPage}} </span>' + $config.i18nInfo.afterCurrentPage + '</span>' +
                '<button id="btn-page-next-{{sourceName}}" type="button" class="btn pager-btn-next" ng-click="nextPage()"><i class="fi fi-next"></i></button>' +
                '<button id="btn-page-last-{{sourceName}}" ng-if="showTotal" type="button" class="btn pager-btn-last" ng-click="lastPage()"><i class="fi fi-last"></i></button>' +
                '<button id="btn-page-refresh-{{sourceName}}" disabled="true" ng-show="showRefresh" type="button"  class="btn pager-btn-refresh" ng-click="refresh()"><i class="fi fi-refresh"></i></button>' +
                '<span class="pager-desc pager-last-item">{{recordFrom}}-{{recordTo}}&nbsp;&nbsp;' +
                '<span ng-if="showTotal">' + $config.i18nInfo.beforeTotalRecord + '<span id="grid-totalrecord-{{sourceName}}" ng-bind="totalRecord"></span>' + $config.i18nInfo.afterTotalRecord + '</span>' +
                '<span ng-if="!showTotal"> ' +
                '<a ng-if="!fetchTotalStatus" id="btn-show-total-{{sourceName}}" disabled="true"  href="javascript:void(0)" ng-click="fetchTotal()">获取总条数</a>' +
                '<a ng-if="fetchTotalStatus === 1" href="javascript:void(0)">获取中...</a>' +
                '<span ng-if="fetchTotalStatus === 2">' + $config.i18nInfo.beforeTotalRecord + '<span id="grid-totalrecord-{{sourceName}}" ng-bind="totalRecord2"></span>' + $config.i18nInfo.afterTotalRecord + '</span>' +
                ' </span>' +
                '</span>' +
                '</div>',
            restrict: 'E',
            compile: function (tElement, tAttrs) {

                return function (scope, element, attrs) {
                    /*初始化参数*/
                    scope.isShow = false;
                    scope.pagination = new Pagination(scope, element, attrs);

                    scope.showRefresh = attrs.refreshable === 'false' ?
                        false :
                        true;

                    if (angular.isDefined(attrs.showTotal)) {
                        scope.showTotal = attrs.showTotal !== 'false';
                    } else {
                        try {
                            scope.showTotal = config.controls.pagination.showTotal;
                            if (scope.showTotal !== false) {
                                scope.showTotal = true;
                            }
                        } catch (e) {
                            scope.showTotal = true;
                        }
                    }
                    
                    if(attrs.disabled && attrs.disabled!=="true" && attrs.disabled!=="false"){
                        //开启自控制状态
                        scope.pagination.pageStyle = ControlMode.CUSTOM_CONTROL_MODE.renderPageStyle;
                        scope.$watch("disabled",function(newVal,oldVal){
                            scope.pagination.pageStyle(scope.currentPage);
                        });
                    }else{
                        scope.pagination.pageStyle = ControlMode.DEFAULT_CONTROL_MODE.renderPageStyle;
                    }

                    scope.changeToNum = function () {
                        scope.currentPage = parseInt(scope.currentPage);
                    }

                    scope.showPageSize = function () {
                        scope.isShow = !scope.isShow;
                    }

                    scope.pagination.initDataSource();

                    element.find("button.pager-btn-refresh").attr("id", "grid-refresh-" + attrs.sourceName);
                    scope.refresh = function () {
                        if (!scope.disabled)
                            scope.pagination.refresh();
                    }

                    element.find("button.pager-btn-next").attr("id", "grid-nextPage-" + attrs.sourceName);
                    scope.nextPage = function () {
                        var nextPageNum = Number(scope.currentPage);
                        
                        if ((nextPageNum + 1 <= scope.totalPage || !scope.totalPage) && !scope.disabled ) {
                            scope.pagination.action = "next";
                            scope.pagination.goPage(nextPageNum + 1);
                        }
                    }

                    element.find("button.pager-btn-prev").attr("id", "grid-previousPage-" + attrs.sourceName);
                    scope.previousPage = function () {
                        if (scope.currentPage - 1 >= 1 && !scope.disabled) {
                            scope.pagination.action = "prev";
                            scope.pagination.goPage(scope.currentPage - 1);
                        }
                    }

                    element.find("button.pager-btn-first").attr("id", "grid-firstPage-" + attrs.sourceName);
                    scope.firstPage = function () {
                        if (!scope.disabled) {
                            scope.pagination.goPage(1);
                        }
                    }

                    scope.verifyNum = function () {
                        //scope.currentPage = scope.currentPage;
                        if (scope.currentPage <= 0) {
                            //scope.currentPage=1;
                        } else if (scope.currentPage > scope.totalPage) {
                            scope.currentPage = scope.totalPage;
                        }
                    }

                    scope.fetchTotal = function () {
                        var dataSource = $dataSourceManager.dataSources[scope.sourceName];
                        var disabledFetchTotal = !(dataSource.records && dataSource.records.length); 
                        if(!disabledFetchTotal){
                            scope.fetchTotalStatus = 1; // fetchTotalStatus: 1-获取中 2-已获取
                            $dataSourceManager.dataSources[scope.sourceName].getTotalCount()
                                .success(function (data) {
                                    $timeout(function () {
                                        if (data.success) {
                                            scope.fetchTotalStatus = 2;
                                            scope.totalRecord2 = data.total || data.totalRecord;
                                        } else if (data.totalRecord) {
                                            scope.fetchTotalStatus = 2;
                                            scope.totalRecord2 = data.totalRecord;
                                        } else {
                                            scope.fetchTotalStatus = 0;
                                        }
                                        var totalPage = (scope.totalRecord2/scope.pageSize);
                                        scope.totalPage = parseInt(totalPage);
                                        if(totalPage>scope.totalPage){
                                            scope.totalPage = scope.totalPage+1;
                                        }
                                        scope.pagination.pageStyle(scope.currentPage);
                                    });

                            })
                        }
                    };

                    element.find("button.pager-btn-last").attr("id", "grid-lastPage-" + attrs.sourceName);
                    scope.lastPage = function () {
                        if (!scope.disabled)
                            scope.pagination.goPage(scope.totalPage);
                    }
                    scope.inputText = element.find("input");
                    scope.inputText.attr("id", "grid-currentPage-" + attrs.sourceName);
                    scope.inputText.on('change', function () {
                        scope.pagination.goPage(parseInt(scope.inputText.val()));
                        scope.$apply();
                    });

                    element.find("span[ng-bind='totalRecord']").attr("id", "grid-totalRecord-" + attrs.sourceName);
                    $timeout(function(){
                        scope.pagination.pageStyle();
                    });
                }
            }
        }
    }
});