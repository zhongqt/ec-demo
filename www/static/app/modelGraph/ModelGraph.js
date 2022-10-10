(function (window) {
    var ds = window.ds;
    if (!window.ds) ds = window.ds = {};
    ds.types = {field: Field, combined: Combined};
    function Field() {}

    function Combined(modelName) {
        this.modelName = modelName;
    }

    var f = new Field(),
        c = Combined.constructor;

    ds.QMainOrder = {orderId: f, orderName: f, shipAddress: f, fromAddress: f, createDatetime:f, createUsername:f, modifyDatetime:f, modifyUsername:f};
    ds.QProjectConfig = {id:f, projectKey:f, projectDesc: f, sessionType:f, signKey:f, logDatabaseId:f, destroyed:f};
    ds.QDataSource = {id:f, projectId:f, dataSourceName:f, schemaName:f, databaseType:f, status:f, url:f, driverClassName:f, username:f, password:f, props:f,chineseWidth:f,version:f, destroyed:f, project:c('ProjectConfig')};
    ds.QModelInfo = {id:f, modelName:f, tableName:f, dataSourceId:f, dataSource:c('DataSource')};
    ds.QEmployee = {username:f, password:f};
    ds.QDept = {id:f, deptName:f}
}(window));