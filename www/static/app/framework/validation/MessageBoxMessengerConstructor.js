define("framework/validation/MessageBoxMessengerConstructor", [
    'framework/validation/AbstractIllegalMessenger'
], function (AbstractIllegalMessenger) {
    return function () {
        function MessageBoxMessenger (){
        }

        MessageBoxMessenger.prototype = new AbstractIllegalMessenger();

        MessageBoxMessenger.prototype.handle = function (msgParams) {
            var $target = msgParams.$verifyTarget,
                $outerContainer = msgParams.$outerContainer;
            var scope = angular.element(document).scope();
            var indexScope = top.angular.element("body").scope();
            var frame = top.angular.element("#" + indexScope.activeTabId + "_frame");
            var mainScope = frame[0].contentWindow.angular.element("body").scope();
            if (!msgParams.isValid) {
                var propertyMsg = msgParams.message;
                var propertyId = "";
                if($outerContainer[0].tagName == "TD") {
                    propertyId = $outerContainer.closest(".grid-body").parent()[0].id;
                } else {
                    if($outerContainer.closest("form").hasClass("ht-validate-form")) {
                        propertyId = $outerContainer.closest("form").parent()[0].id;
                    } else {
                        propertyId = $outerContainer[0].id;
                    }
                }
                var messageStr = '<a href="#'+propertyId+'" style="color: red;">'+propertyMsg+'</a><br/>';
                // if(mainScope.bosMsg == undefined){
                //     mainScope.bosMsg = '';
                // }
                // mainScope.bosMsg += messageStr;
                this.showMsg(messageStr);
            }
            //console.error(mainScope.bosMsg);
        }

        MessageBoxMessenger.prototype.clear = function () {
            $("#mesBox").remove();
        }

        MessageBoxMessenger.prototype.showMsg = function(msg) {
            if($("#mesBox").length < 1) {
                var divBox = '<div id="mesBox" style="height:200px;width:250px;position: fixed;overflow-y: auto;background-color: white;right:100px;top: 50px;border: 1px solid #CCCCCC;z-index:9998;"></div><div id="removeBox" style="position: fixed;right:105px;top:55px;height:10px;width:10px;z-index:9999;background:url(/resource/images/dms3/close_on3.png) no-repeat center center;background-size:10px 10px;"><div>';
                $(document.body).append(divBox);

                $("#removeBox").click(function(){
                    $("#mesBox").remove();
                    $("#removeBox").remove();
                });
            }
            $("#mesBox").append(msg);
        }

        return new MessageBoxMessenger();
    };

});