(function() {
    define(["angular"], function(angular) {
        var DataTreeManager,dataTreeManager;
        DataTreeManager =(function() {
            function DataTreeManager(){
                this.dataTrees = {};

            }
            DataTreeManager.prototype.registerDataTree = function(name,dataTree){
                this.dataTrees[name] = dataTree;
            };
            DataTreeManager.prototype.getDataTree = function(name){
                return this.dataTrees[name];
            };
            return DataTreeManager;
        })();
        dataTreeManager =  void 0;
        return function() {
            if (angular.isUndefined(dataTreeManager)) {
                dataTreeManager = new DataTreeManager();
            }
            return dataTreeManager;
        };
    });
})();