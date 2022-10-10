/**
 * Created by linxh on 2015/7/7.
 */
define("framework/dropdown/GillionDropItemSelectAllDirectiveConstructor",['angular'],function(angular){
    return function(){
        var DROPITEMOBJ = 'DROP_ITEM_OBJ';
        function DropItemSelectAll(scope,element,attrs){
            this.scope = scope;
            this.element = element;
            this.attrs = attrs;
        };

        DropItemSelectAll.prototype.select = function() {
            this.element.attr("selected","selected");
            this.scope.isSelected = true;
            //this.scope.$digest();
        };

        DropItemSelectAll.prototype.unSelect = function() {
            this.element.removeAttr("selected");
            this.scope.isSelected = false;
            //this.scope.$digest();
        };


        DropItemSelectAll.prototype.getSelect = function(){
            return !!this.scope.isSelected;
        };

        DropItemSelectAll.prototype.addSelectStyle = function(){
            this.element.addClass('current');
        };

        DropItemSelectAll.prototype.removeSelectStyle = function(){
            this.element.removeClass('current');
        };

        return{
            restrict:"E",
            template:'<li class="checkbox-all"><a href="javascript:void(0)"><i class="fi fi-checkbox" ></i></a></li>',
            replace: true,
            transclude:true,
            scope:true,
            require: "?^gDropdown",
            compile:function(tElement, tAttrs,transclude){
                return function(scope, element,attrs){

                    var controller = element.parent("ul").data(DROPITEMOBJ);
                    transclude(scope, function (clone) {
                        if(clone[0] && clone[0].tagName=='SPAN'){
                            element.find("a").append(clone[0].innerText);
                        }
                    });

                    var dropItem = new DropItemSelectAll(scope,element,attrs);
                    controller.dropItemSelectAll = dropItem;

                    element.on("click",function(){
                        controller.selectAll();
                    });
                }
            }
        }
    }
})