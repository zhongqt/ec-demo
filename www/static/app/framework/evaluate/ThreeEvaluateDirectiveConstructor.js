/**
 * Created by yanpp on 15-3-3.
 */

define('framework/evaluate/ThreeEvaluateDirectiveConstructor',['angular'],function(angular){
    return function($http, $parse, $timeout,$compile){

        function ThreeEvaluate($scope, $element, $attributes){
            var me=this;
            me.element=$element;
            me.attributes = $attributes;
            me.scope = $scope;
            me.evaluateName=me.scope.threeEvaluateName||"threeEvaluate";
            me.scope.selectedValue=me.scope.selectedValue||"3";
        }

        /**
         * 选择评价
         * @param event
         */
        ThreeEvaluate.prototype.selectLevel=function(event){
            var $row = $(event.srcElement || event.target).closest('span'),
                $input=$row.children("input[type='radio']");
            if(angular.isDefined($input)) {
                $input.prop("checked", true);

                if(angular.isDefined($input.val()))
                    this.setSelectedValue($input.val());
            }
        };

        ThreeEvaluate.prototype.setSelectedValue=function(value){
            this.scope.selectedValue=value;
        };


        return {
            template:'<div ng-click="threeEvaluate.selectLevel($event)"><span style="cursor:pointer" >好评<input type="radio" name="{{threeEvaluate.evaluateName}}" value="3" checked="true"/></span><span  style="cursor:pointer" >中评<input type="radio" name="{{threeEvaluate.evaluateName}}" value="2" /></span><span style="cursor:pointer" >差评<input type="radio" name="{{threeEvaluate.evaluateName}}" value="1" /></span></div>',
            restrict:"EA",
            scope:{
                threeEvaluateName:"@",
                selectedValue:"="
            },
            link:function(scope, iElement, iAttrs){
                var me = this;
                me.threeEvaluate = scope.threeEvaluate = new ThreeEvaluate(scope, iElement, iAttrs);


            }
        }

    };
});

