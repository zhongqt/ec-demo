/**
 * Created by linxh on 2015/8/3.
 */

define('framework/download/GillionDownloadServiceConstructor',[],function(){

    function DownloadService($http){
        this.$http = $http;
    }

    DownloadService.prototype.download =function (url,params){
        this.$http.get(url).success(function(data, status, headers, config) {
        });
    }

        return function($http){
            return new DownloadService($http);
        }
})
