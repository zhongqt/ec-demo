/**
 * Created by yanpp on 15-3-3.
 */
define('framework/evaluate/RatingDirectiveConstructor', ['angular'], function (angular) {

    return function ($http, $parse, $timeout, $compile) {
        function Rating($scope, $element, $attrs) {
            var me = this;
            me.scope = $scope;
            me.attrs = $attrs;
            me.element = $element;
            me.initValue = me.scope.ratingCurentIndex;
            me.initPoint = me.parsePoint(me.scope.initPoint) || [1, 2, 3, 4, 5];
            me.initIndex = me.indexOf(me.initPoint, me.scope.initScore);
            me.initIndex = me.initIndex != -1 ? me.initIndex + 1 : me.initIndex;
            this.initRating();

        }

        Rating.prototype.parsePoint = function (pointStrArr) {
            if (angular.isDefined(pointStrArr)) {
                var pointArr = pointStrArr.split(","), tempPointArr = [];
                pointArr = this.uniqueAndSort(pointArr);
                for (var index in pointArr) {
                    if (!isNaN(pointArr[index])) {
                        tempPointArr.push(pointArr[index]);
                    }
                }
                return tempPointArr.sort(function (a, b) {
                    return a - b;
                });
            }
            return pointStrArr;
        };

        Rating.prototype.uniqueAndSort = function (arr) {
            if (angular.isUndefined(arr))
                return arr;
            var a = [],
                o = {},
                i,
                v,
                len = arr.length;
            if (len < 2) {
                return arr;
            }
            for (i = 0; i < len; i++) {
                v = arr[i];
                if (o[v] !== 1) {
                    a.push(v);
                    o[v] = 1;
                }
            }
            return a.sort(function (c, b) {
                return c - b;
            });
        };

        Rating.prototype.indexOf = function (arr, el) {

            if (angular.isUndefined(arr))
                return -1;


            for (var i = 0, n = arr.length; i < n; i++) {
                if (arr[i] == el) {

                    return i;
                }
            }
            return -1;
        };

        Rating.prototype.initRating = function () {
            var counter = 0;
            var me = this;
            if (angular.isDefined(me.element.find("i").length) && me.element.find("i").length > 0) {
                this.element.find("i").each(function () {
                    if (counter < me.initIndex) {
                        $(this).removeClass().addClass("level_solid");
                        counter++;
                    } else
                        $(this).removeClass().addClass("level_hollow");
                });
            }
        };
        return {
            template: '<div class="revinp"><span class="level" ><i ng-class="{true: \'level_solid\', false: \'level_hollow\'}[{{$index}}<rating.initIndex]" ng-repeat="point in rating.initPoint" data-value="{{point}}" data-index="{{$index}}"></i></span></div>',
            restrict: "EA",
            scope: {
                initPoint: "@",
                initScore: "@",
                isEvaluation: "@",
                ratingValue: "=",
                renderModel: "=",
                editable: "="
            },
            /*scope: true,*/
            link: function (scope, element, attrs) {
                var initScore = attrs.initScore,
                    initScoreGetter = $parse(initScore)(scope) || 0,
                    isEvaluation = attrs.isEvaluation,
                    isEvaluationGetter = $parse(isEvaluation)(scope);

                scope.ratingValue = initScoreGetter || 0;
                scope.ratingCurentIndex = scope.ratingCurentIndex || 0;
                scope.initPoint = attrs.initPoint;
                scope.initScore = initScoreGetter;
                var me = this;
                function initRating() {
                    me.rating = scope.rating = new Rating(scope, element, attrs);
                }

                initRating();
                if (angular.isString(attrs.renderModel)) {
                    scope.$watch("renderModel", function (score) {
                        if (angular.isDefined(score)) {
                            scope.initScore = score;
                            scope.ratingValue = score;
                            initRating();
                        }
                    });
                }

                scope.$watch("editable", function (score) {
                    if (angular.isDefined(score)) {
                        if (score.toString() === "true")
                            isEvaluationGetter = true;
                        else if (score.toString() === "false")
                            isEvaluationGetter = false;
                        else
                            isEvaluationGetter = $parse(isEvaluation)(scope);
                    }
                });


                $(".level", element).click(function (event) {
                    if (angular.isUndefined(isEvaluationGetter) || isEvaluationGetter) {
                        var $row = $(event.srcElement || event.target).closest('i');
                        if (angular.isDefined($row.prevAll().length)) {
                            scope.$apply(function (scope) {
                                scope.ratingValue = $row.data("value");
                                scope.ratingCurentIndex = $row.prevAll().length + 1;
                                scope.initScore = scope.ratingValue;
                            });
                            initRating();
                            me.rating.initRating();
                        }
                    }
                });
            }
        }
    };

});