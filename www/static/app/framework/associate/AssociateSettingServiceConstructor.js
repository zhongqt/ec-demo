define('framework/associate/AssociateSettingServiceConstructor', ['angular', 'underscore'], function (angular, _) {

    var AssociateSettingService = function ($rootScope, $dataSourceManager) {
        this.$rootScope = $rootScope;
        this.$dataSourceManager = $dataSourceManager;
    };

    var Proto = AssociateSettingService.prototype;

    Proto.getColumns = function (key) {
        if (!window.ASSOCIATE_CONSTANT || !window.ASSOCIATE_CONSTANT[key]) throw "KEY值未注册";
        var setting = window.ASSOCIATE_CONSTANT[key];
        return _.clone(setting["columns"]);
    };

    Proto._getValue = function (express) {
        if (!express) return undefined;

        var me = this,
            value = me.$rootScope,
            ary = express.split(".");

        for (var i = 0; i < ary.length; i++) {
            if (value == undefined || value == null) return undefined;
            value = value[ary[i]];
        }

        if (value == me.$rootScope) return undefined;
        return value;
    };

    Proto.getQuery = function (key, sourceName) {
        if (!window.ASSOCIATE_CONSTANT || !window.ASSOCIATE_CONSTANT[key]) throw "KEY值未注册";
        var setting = window.ASSOCIATE_CONSTANT[key];

        var me = this,
            searchColumns = [],
            sortColumns = [];
        var source = me.$dataSourceManager.dataSources[sourceName];
        if (setting["conditions"]) {
            var conditions = setting["conditions"];
            _.each(conditions, function (condition) {
                var value;
                if (condition.express_type == "global") {
                    value = me._getValue(condition["express"]);
                } else if (condition.express_type == "datasource") {
                    if (source) {
                        value = source[condition["express"]];
                    }
                } else if (condition.value !== undefined) {
                    value = condition.value;
                }
                if (value == undefined) return;

                var searchColumn = {};
                if (condition.propertyName) searchColumn.propertyName = condition.propertyName;
                if (condition.columnName) searchColumn.columnName = condition.columnName;
                if (condition.operation) searchColumn.operation = condition.operation;
                if (condition.dataType) searchColumn.dataType = condition.dataType;
                if (condition.junction) searchColumn.junction = condition.junction;
                if (condition.isMulti) searchColumn.isMulti = condition.isMulti;
                if (condition.operation) searchColumn.operation = condition.operation;
                if (_.isArray(value) || (condition.operation && condition.operation.toLowerCase() == "in")) {
                    var arr = [];
                    if (!_.isArray(value)){
                        arr = value.split(",");
                        if (!_.isEmpty(arr) && arr.length <= 1)
                            arr = value.split(";");
                        if (!_.isEmpty(arr) && arr.length <= 1)
                            arr = value.split("\n");
                        value = arr;
                    }
                    searchColumn.listValue = value;
                } else {
                    searchColumn.value = value;
                }

                searchColumns.push(searchColumn);
            });
        }

        if (setting["sorts"]) {
            _.each(setting["sorts"], function (sort) {
                sortColumns.push(angular.copy(sort));
            });
        }

        return {"searchColumns": searchColumns, "sortColumns": sortColumns, "queryResultType": "page", "sum": false};
    };

    var svr = void 0;
    return function ($dataSourceManager, $rootScope) {
        if (angular.isUndefined(svr)) {
            svr = new AssociateSettingService($rootScope, $dataSourceManager);
        }
        return svr;
    };
});