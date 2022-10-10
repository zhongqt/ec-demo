define('framework/areas/AreasModule', [
    'angular',
    'jquery',
    'config.properties',
    'framework/areas/AreaServiceConstructor',
    'framework/constant/KEYS',
    'framework/snapshot/GillionLocationServiceConstructor',
    'framework/msg/GillionMsgModule'
], function (angular, $, config, AreaServiceConstructor, KEYS, GillionLocationServiceConstructor) {
    var searchAreaUrl = config.controls.areas.searchingUrl;
    return angular.module('AreasModule', ['GillionMsgModule'])
        .directive('gAreas', ['$compile', 'AreaService', 'Arrays', '$window', '$document', '$timeout', '$http', '$tabindex', 'GillionMsgService', 'Locations',
            function ($compile, AreaService, Arrays, $window, $document, $timeout, $http, $tabindex, GillionMsgService, Locations) {
            var AreaGroup = AreaService.AreaGroup,
                CONSTANTS = {
                    PRE_GROUP: {
                        province: [],
                        city: [AreaGroup.PROVINCE],
                        county: [AreaGroup.PROVINCE, AreaGroup.CITY]
                    }
                };
            var tmpl = '<div class="form-region" ng-click="areas.clickPanel($event)">\n    <ul class="form-region-search" ng-show="areas.searching === true">\n        <li ng-repeat="area in areas.foundAreas" ng-click="areas.deepSelect($event, area.code)">\n            {{areas.getDisplayPath(area.code)}}\n        </li>\n    </ul>\n    <div class="form-region-menu" ng-show="areas.selection === true">\n        <ul class="form-region-tabs" ng-class="{\'form-region-3options\': disableHots === \'true\'}"\n            ng-click="toggleAreaGroup($event)">\n            <li selected="selected" data-area-group="common" selected ng-if="disableHots !== \'true\'">热门城市</li>\n            <li data-area-group="province">省份</li>\n            <li disabled="disabled" data-area-group="city" disabled>城市</li>\n            <li disabled="disabled" data-area-group="county" disabled>区县</li>\n        </ul>\n        <ul class="form-region-hot" ng-show="areas.activeTab === \'common\'" ng-if="disableHots !== \'true\'">\n            <li ng-repeat="area in areas.commonAreas" ng-click="areas.deepSelect($event, area.c)" ng-bind="area.n"></li>\n        </ul>\n        <div class="form-region-body" ng-show="areas.activeTab === \'province\'">\n            <button type="button" class="btn form-region-btn" ng-click="areas.goPrevProvincePage()">\n                <i class="fi fi-arrow-left"></i>\n            </button>\n            <div class="form-region-province">\n                <div class="form-region-province-group" ng-repeat="provinceGroup in areas.provinceGroupPage">\n                    <span class="form-region-province-groupname"> {{provinceGroup.range}} </span>\n                    <ul class="form-region-province-items">\n                        <li ng-repeat="province in provinceGroup.provinces"\n                            ng-click="areas.select($event, province.c, $index)">\n                            {{province.n}}\n                        </li>\n                    </ul>\n                </div>\n            </div>\n            <button type="button" class="btn form-region-btn" ng-click="areas.goNextProvincePage()">\n                <i class="fi fi-arrow-right"></i>\n            </button>\n        </div>\n        <div class="form-region-body" ng-show="areas.activeTab === \'city\'">\n            <button type="button" class="btn form-region-btn" ng-click="areas.goPrevCityPage()">\n                <i class="fi fi-arrow-left"></i>\n            </button>\n            <ul class="form-region-citys">\n                <li ng-repeat="city in areas.cities" ng-click="areas.select($event, city.c, $index)">\n                    {{city.n}}\n                </li>\n            </ul>\n            <button type="button" class="btn form-region-btn" ng-click="areas.goNextCityPage()">\n                <i class="fi fi-arrow-right"></i>\n            </button>\n        </div>\n        <div class="form-region-body" ng-show="areas.activeTab === \'county\'">\n            <button type="button" class="btn form-region-btn" ng-click="areas.goPrevCountyPage()">\n                <i class="fi fi-arrow-left"></i>\n            </button>\n            <ul class="form-region-citys">\n                <li ng-repeat="county in areas.counties" ng-click="areas.select($event, county.c, $index)">{{county.n}}\n                </li>\n            </ul>\n            <button type="button" class="btn form-region-btn" ng-click="areas.goNextCountyPage()">\n                <i class="fi fi-arrow-right"></i>\n            </button>\n        </div>\n    </div>\n</div>';

            /**
             *
             * @param params Areas 构造函数的构造参数
             * @param params Areas.scope {Object} 构造函数的构造参数
             * @param params Areas.attrs {Object} 构造函数的构造参数
             * @param params Areas.element {HTMLInputElement} 构造函数的构造参数
             * @param params [Areas.ngModelController] {ngModelController} 构造函数的构造参数
             *
             * @constructor
             */
            function Areas(params) {
                var me = this,
                    element = params.element,
                    ngModelController = params.ngModelController,
                    provinceGroupPages = AreaService.getProvinceGroupPages(),
                    outputAreaCodeFormatter = AreaService.getCodeFormatter();
                me.scope = params.scope;
                me.ngModelController = ngModelController;
                me.element = element;
                me.attrs = params.attrs;
                me.areaPanel = params.areaPanel;

                //noinspection JSUnusedGlobalSymbols
                me.activeTab = AreaGroup.COMMON;
                //noinspection JSUnusedGlobalSymbols
                me.__showPanel = false;

                me.commonAreas = AreaService.getCommonAreas();
                if (me.element.attr("autocomplete") != "off") {
                    me.element.attr("autocomplete","off");
                }

                ngModelController.$render = function (rawValue) {
                    AreaService.allAreasLoadedPromise().then(function() {
                        var value = rawValue || ngModelController.$viewValue,
                            display,
                            scope = me.scope,
                            area = AreaService.findArea(value);
                        if (value) {
                            display = me.getDisplay(value);
                            element.val(display);
                        } else {
                            element.val('');
                        }
                        //如果控件有绑定选中地区
                        if (area && !!params.attrs.selectedArea) {
                            scope.$selectedArea = {
                                display: display,
                                code: outputAreaCodeFormatter(area.code),
                                name: area.name
                            };
                        }
                    });
                };

                me.provincePageNumber = 1;
                me.cityPageNumber = 1;
                me.countyPageNumber = 1;

                me.provinceGroupPage = provinceGroupPages[0];

                me.$areaGroupButtons = me.areaPanel.find('.form-region-tabs > li');
                me.$commonGroupButton = me.$areaGroupButtons.filter('[data-area-group=common]');
                me.$provinceGroupButton = me.$areaGroupButtons.filter('[data-area-group=province]');
                me.$cityGroupButton = me.$areaGroupButtons.filter('[data-area-group=city]');
                me.$countyGroupButton = me.$areaGroupButtons.filter('[data-area-group=county]');
                me.$searchingPanel = me.areaPanel.find('.form-region-search');

                me.selectedIndexes = {
                    province: 0,
                    city: 0,
                    county: 0
                };

                if (me.scope.disableHots === 'true') {
                    me.$provinceGroupButton.attr('selected', 'selected');
                    me.activeTab = AreaGroup.PROVINCE;
                }
            }

            //noinspection JSUnusedGlobalSymbols
            Areas.prototype = {
                // 翻页 start
                goPrevProvincePage: function () {
                    this.goAddedStepProvincePage(-1);
                },

                goNextProvincePage: function () {
                    this.goAddedStepProvincePage(1);
                },

                goAddedStepProvincePage: function (step) {
                    var me = this,
                        targetPage = me.provincePageNumber + step;
                    if (me.hasAddedStepProvincePage(step)) {
                        me.provincePageNumber = targetPage;
                        me.provinceGroupPage = AreaService.getProvinceGroupPages()[targetPage - 1];
                    }
                },

                hasPrevProvincePage: function () {
                    return this.hasAddedStepProvincePage(-1);
                },
                hasNextProvincePage: function () {
                    return this.hasAddedStepProvincePage(1);
                },

                hasAddedStepProvincePage: function (step) {
                    var me = this,
                        page = me.provincePageNumber,
                        totalPage = AreaService.getProvinceGroupPages().length,
                        targetPage = page + step;
                    return targetPage >= 1 && targetPage <= totalPage;
                },

                goPrevCityPage: function () {
                    this.goAddedStepCityPage(-1);
                },

                goNextCityPage: function () {
                    this.goAddedStepCityPage(1);
                },

                goAddedStepCityPage: function (step) {
                    var me = this,
                        start, end;
                    if (me.hasAddedStepCityPage(step)) {
                        me.cityPageNumber += step;
                        start = (me.cityPageNumber - 1) * 12;
                        end = Math.min(start + 12, me.allCities.length);
                        me.cities = me.allCities.slice(start, end);
                    }
                },

                hasPrevCityPage: function () {
                    return this.hasAddedStepCityPage(-1)
                },

                hasNextCityPage: function () {
                    return this.hasAddedStepCityPage(1)
                },

                hasAddedStepCityPage: function (step) {
                    var me = this;
                    return hasAddedStepPage(step, me.cityPageNumber, me.allCities.length)
                },

                goPrevCountyPage: function () {
                    this.goAddedStepCountyPage(-1);
                },

                goNextCountyPage: function () {
                    this.goAddedStepCountyPage(1);
                },

                goAddedStepCountyPage: function (step) {
                    var me = this,
                        start, end;
                    if (me.hasAddedStepCountyPage(step)) {
                        me.countyPageNumber += step;
                        start = (me.countyPageNumber - 1) * 12;
                        end = Math.min(start + 12, me.allCounties.length);
                        me.counties = me.allCounties.slice(start, end);
                    }
                },

                hasPrevCountyPage: function () {
                    return this.hasAddedStepCountyPage(-1)
                },

                hasNextCountPage: function () {
                    return this.hasAddedStepCountyPage(1)
                },

                hasAddedStepCountyPage: function (step) {
                    var me = this;
                    return hasAddedStepPage(step, me.countyPageNumber, me.allCounties.length)
                },
                // 翻页 end

                select: function ($event, areaCode, selectedIndex) {
                    var me = this,
                        scope = me.scope,
                        selectParams = me.getSelectParams($event, areaCode),
                        onBeforeSelect = scope.onBeforeSelect,
                        onSelect = scope.onSelect;

                    if (onBeforeSelect(selectParams) !== false) {
                        me.selectedArea = selectParams.area;
                        me['select_' + selectParams.group]();
                        if (canGroupRender(scope, selectParams.group)) {
                            me.renderArea();
                        }
                        me.renderGroupBtnAttrs(selectParams.group);
                        // 设置选中 index
                        me.selectedIndexes[selectParams.group] = selectedIndex;
                        onSelect(selectParams);
                    }
                },

                getSelectParams: function ($event, areaCode) {
                    if (!areaCode) return {$event: $event};
                    var me = this,
                        outputAreaCodeFormatter = AreaService.getCodeFormatter(me.scope.codeFormatter),
                        originalArea =  AreaService.findArea(areaCode),
                        group = AreaService.getGroupName(areaCode),
                        area = {
                            name: originalArea.name,
                            code: outputAreaCodeFormatter(originalArea.code),
                            display: me.getDisplay(areaCode)
                        };
                    return {
                        $event: $event,
                        code: area.code,
                        area: area,
                        group: group
                    }
                },

                select_province: function (province) {
                    var me = this,
                        selectedProvince = province || me.selectedArea,
                        provinceCode = selectedProvince.code;
                    Arrays.makeEmpty(me.cities);
                    me.allCities = AreaService.getAreaChildren(provinceCode, AreaGroup.PROVINCE);
                    if (isSpecialArea(me.allCities)) {
                        me.renderArea();
                        me.closePanel();
                        return;
                    }
                    me.goAddedStepCityPage(0);

                    me.allCounties = undefined;
                    me.selectedProvince = selectedProvince;
                    me.selectedCity = undefined;
                    me.selectedCounty = undefined;
                },

                select_city: function (city) {
                    var me = this,
                        selectedCity = city || me.selectedArea,
                        cityCode = selectedCity.code;
                    Arrays.makeEmpty(me.counties);
                    //noinspection JSUnusedGlobalSymbols
                    me.allCounties = AreaService.getAreaChildren(cityCode, AreaGroup.CITY);
                    me.goAddedStepCountyPage(0);

                    me.selectedCity = selectedCity;
                    me.selectedCounty = undefined;
                },

                select_county: function () {
                    var me = this;
                    me.selectedCounty = me.selectedArea;
                    me.closePanel();
                },

                renderGroupBtnAttrs: function (groupName) {
                    var me = this,
                        $areaGroupButtons = me.$areaGroupButtons,
                        $cityGroupButton = me.$cityGroupButton,
                        $countyGroupButton = me.$countyGroupButton;
                    switch (groupName) {
                        case AreaGroup.PROVINCE:
                            $areaGroupButtons.filter('[selected]').removeAttr('selected');
                            $cityGroupButton.attr('selected', 'selected').removeAttr('disabled');
                            $countyGroupButton.attr('disabled', 'disabled');
                            me.activeTab = AreaGroup.CITY;
                            break;
                        case AreaGroup.CITY:
                        case AreaGroup.COUNTY:
                            $areaGroupButtons.filter('[selected]').removeAttr('selected');
                            $cityGroupButton.removeAttr('disabled');
                            $countyGroupButton.attr('selected', 'selected').removeAttr('disabled');
                            me.activeTab = AreaGroup.COUNTY;
                            break;
                    }
                },

                /**
                 * 逐层选择地区， 例如如果选择市， 也将选择市所在的省
                 * @param $event {Event} 事件对象
                 * @param areaCode {String} 地区编号
                 */
                deepSelect: function ($event, areaCode) {
                    var me = this,
                        scope = me.scope,
                        selectParams = me.getSelectParams($event, areaCode),
                        onBeforeSelect = scope.onBeforeSelect,
                        onSelect = scope.onSelect;

                    if (onBeforeSelect(selectParams) !== false) {
                        me.selectedArea = selectParams.area;
                        me.selectPreGroupArea(areaCode, selectParams.group);
                        me['select_' + selectParams.group](selectParams.area);
                        me.renderGroupBtnAttrs(selectParams.group);
                        if (canGroupRender(scope, selectParams.group)) {
                            me.renderArea();
                        }
                        if (me.searching === true) {
                            me.searching = false;
                            me.selection = true;
                        }
                        onSelect(selectParams);
                    }
                },

                selectPreGroupArea: function (areaCode, groupName) {
                    var me = this,
                        group = groupName || AreaService.getGroupName(areaCode),
                        pascalGroupName = group.charAt(0).toUpperCase() + group.substr(1),
                        preGroup = CONSTANTS.PRE_GROUP[group],
                        area;
                    angular.forEach(preGroup, function (group) {
                        area = AreaService['find' + pascalGroupName](areaCode);
                        me['select_' + group](area);
                    });
                },

                /**
                 * @private 转化当前地区数据到视图
                 */
                renderArea: function () {
                    var me = this,
                        element = me.element,
                        outputAreaCodeFormatter = AreaService.getCodeFormatter(me.scope.codeFormatter),
                        ngModelController = me.ngModelController,
                        formattedCode;

                    me.renderedArea = me.selectedArea;

                    if (me.renderedArea) {
                        if (angular.isDefined(ngModelController)) {
                            formattedCode = outputAreaCodeFormatter(me.renderedArea.code);
                            ngModelController.$setViewValue(formattedCode);
                            ngModelController.$render();
                        } else {
                            element.val(me.getDisplay());
                        }
                        if (me.__showPanel === true
                            && me.scope.autoCloseWhenRendered !== 'false'
                            && canAreaCodeRender(me.scope, me.renderedArea.code)) {
                            me.closePanel();
                        }
                    }
                },

                /**
                 * @public
                 * @return {String} 显示在文本框中的信息
                 */
                getDisplay: function (areaCode) {
                    var scope = this.scope,
                        isDisplayPath = angular.isDefined(scope.isDisplayPath) ? scope.isDisplayPath !== 'false' : true,
                        pathSeparator = scope.pathSeparator || '/',
                        areaDeepPath = getAreaDeepPath(areaCode),
                        displayName;

                    if (isDisplayPath) {
                        displayName = Arrays.extract(areaDeepPath, 'name').join(pathSeparator);
                        scope.areaName2Code = displayName + "^" + areaCode;
                        return displayName;
                    } else if (areaDeepPath.length > 0) {
                        displayName = areaDeepPath[areaDeepPath.length - 1].name;
                        scope.areaName2Code = displayName + "^" + areaCode;
                        return displayName;
                    }
                },

                getDisplayPath: function (areaCode) {
                    var province = AreaService.findProvince(areaCode),
                        city = AreaService.findCity(areaCode),
                        county = AreaService.findCounty(areaCode),
                        areas = [province, city, county],
                        pathSeparator = this.scope.pathSeparator || '/';

                    return Arrays.extract(areas, 'name').join(pathSeparator);
                },

                getChildData: function(data){
                    var me = this,
                        scope = me.scope,
                        areaData = [];

                    angular.forEach(data, function (item) {
                        if (!scope.allowChooseProvince && !scope.allowChooseCity) {
                            if (!AreaService.isProvinceCode(item.code) && !AreaService.isCityCode(item.code)) {
                                areaData.push(item);
                            } else {
                                if(AreaService.isCityCode(item.code)) {
                                    areaData = areaData.concat(AreaService.transformerRawAreaList(AreaService.getAreaChildren(item.code,AreaGroup.CITY)));
                                }
                            }
                        } else if (scope.allowChooseProvince && !scope.allowChooseCity) {
                            if (!AreaService.isCityCode(item.code)) areaData.push(item);
                        } else if (!scope.allowChooseProvince && scope.allowChooseCity) {
                            if (!AreaService.isProvinceCode(item.code)) {
                                areaData.push(item);
                                areaData = areaData.concat(AreaService.transformerRawAreaList(AreaService.getAreaChildren(item.code,AreaGroup.CITY)));
                            }
                        } else {
                            areaData.push(item);
                            if (AreaService.isProvinceCode(item.code)) {
                                areaData = areaData.concat(AreaService.transformerRawAreaList(AreaService.getAreaChildren(item.code,AreaGroup.PROVINCE)));
                            } else if(AreaService.isCityCode(item.code)) {
                                areaData = areaData.concat(AreaService.transformerRawAreaList(AreaService.getAreaChildren(item.code,AreaGroup.CITY)));
                            }
                        }
                    });
                    return areaData;
                },

                getFilterData: function(data) {
                    var me = this,
                        scope = me.scope;
                    var areaData = data.filter(function(item){
                        if (!scope.allowChooseProvince && !scope.allowChooseCity) {
                            if (!AreaService.isProvinceCode(item.code) && !AreaService.isCityCode(item.code)) return item;
                        } else if (scope.allowChooseProvince && !scope.allowChooseCity) {
                            if (!AreaService.isCityCode(item.code)) return item;
                        } else if (!scope.allowChooseProvince && scope.allowChooseCity) {
                            if (!AreaService.isProvinceCode(item.code)) return item;
                        } else {
                            return item;
                        }
                    });
                    return areaData;
                },

                search: function () {
                    var me = this,
                        scope = me.scope,
                        element = me.element,
                        keyword = element.val();
                    if (!!$.trim(keyword) && keyword !== scope.$keyword) {
                        me.areaPanel.hide();
                        me.selection = false;
                        me.searching = true;
                        if (me.reSearchTimer) {
                            $timeout.cancel(me.reSearchTimer);
                            me.reSearchTimer = undefined;
                        }
                        me.reSearchTimer = $timeout(function () {
                            scope.$keyword = keyword;
                            $http.get(searchAreaUrl + '?keyword=' + scope.$keyword)
                                .success(function (data) {
                                    if (angular.isArray(data) && data.length > 0) {
                                        me.setAreaPanelCss();
                                        me.areaPanel.show();
                                        if (!scope.isIncludeChildren) {
                                            me.foundAreas = me.getFilterData(data);
                                        } else {
                                            me.foundAreas = me.getChildData(data);
                                        }
                                    } else {
                                        me.areaPanel.hide();
                                        me.foundAreas = [];                                        
                                    }
                                    me.selectedIndex = undefined;
                                });
                        }, 200);
                    }
                },

                resetCity: function () {
                    this.cities = undefined;
                    this.cityPageNumber = 1;
                    this.counties = undefined;
                    this.countyPageNumber = 1;
                    //noinspection JSUnusedGlobalSymbols
                    this.countyDisabled = true;
                },

                resetCounty: function () {
                    this.counties = undefined;
                    this.countyPageNumber = 1;
                },

                clickPanel: function (event) {
                    var me = this;
                    if (me.blurTimer) {
                        $timeout.cancel(me.blurTimer);
                        delete me.blurTimer;
                    }
                    if (me.__showPanel === false) {
                        me.__focusByClickPanel = true;
                    }
                    if (window.document.documentMode <= 9) {
                        var range = me.element[0].createTextRange();
                        range.moveStart('character', me.element.val().length);
                        range.collapse(true);
                        range.select();
                    } else {
                        me.element.focus();
                    }
                    event.stopPropagation();
                },

                closePanel: function () {
                    var me = this,
                        attrs = me.attrs,
                        scope = me.scope,
                        onBeforeClosePanel = scope.onBeforeClosePanel,
                        onClosePanel = scope.onClosePanel,
                        $selectedArea = scope.$selectedArea,
                        areaCode = $selectedArea == undefined ? undefined : $selectedArea.code,
                        selectParams = me.getSelectParams(undefined, areaCode),
                        result;
                    if (angular.isDefined(attrs.onBeforeClosePanel)) {
                        result = onBeforeClosePanel(selectParams);
                        if (result === false) {
                            return;
                        }
                    }

                    me.__showPanel = false;
                    me.areaPanel.hide();

                    if (angular.isDefined(attrs.onClosePanel)) {
                        onClosePanel(selectParams);
                    }
                },

                setAreaPanelCss : function() {
                    var me = this,
                        areaPanel = me.areaPanel.show(),
                        pos = Locations.calculateLocation(me.element),
                        panelWidth = areaPanel.width(),
                        panelHeight = areaPanel.height();
                    if(pos.right < panelWidth){
                        pos.left = pos.left - (panelWidth - pos.right);
                    }
                    if (pos.bottom < (panelHeight + me.element.outerHeight())) {
                        pos.top -= panelHeight;
                    } else {
                        pos.top += me.element.outerHeight();
                    }
                    areaPanel.offset({
                        left: pos.left,
                        top: pos.top
                    });
                },

                showPanel: function () {
                    var me = this;

                    me.setAreaPanelCss();
                    me.__showPanel = true;
                },

                navSearchingByStep: function (step) {
                    var me = this;
                    if (me.selectedIndex === undefined) {
                        me.selectedIndex = -1;
                    }
                    me.selectedIndex += step;
                    if (me.selectedIndex < 0) {
                        me.selectedIndex = me.foundAreas.length - 1;
                    }
                    if (me.selectedIndex >= me.foundAreas.length) {
                        me.selectedIndex = 0;
                    }
                    me.$searchingPanel
                        .find('li')
                        .filter('[active=true]').removeAttr('active').end()
                        .get(me.selectedIndex).setAttribute('active', 'true');
                },

                selectSearching: function (event) {
                    var me = this,
                        scope = me.scope,
                        selectedIndex = me.selectedIndex | 0,
                        selected = me.foundAreas[selectedIndex],
                        areaCode = selected.code,
                        proceeding = scope.$$phase || scope.$root.$$phase,
                        methodName = proceeding ? '$evalAsync': '$apply';
                    if (!canAreaCodeRender(scope, areaCode)) {
                        event.stopPropagation();
                    }
                    scope[methodName](function () {
                        me.deepSelect(null, areaCode);
                    });
                    $tabindex.interrupt();
                },

                nav: function (event) {
                    var me = this;
                    if (me.searching === true && me.foundAreas && me.foundAreas.length > 0) {
                        switch (event.keyCode) {
                            case KEYS.UP:
                                me.navSearchingByStep(-1);
                                break;
                            case KEYS.DOWN:
                                me.navSearchingByStep(1);
                                break;
                            case KEYS.ENTER:
                                me.selectSearching(event);
                                break;
                            default:
                                return;
                        }
                        event.preventDefault();
                    }
                }
            };


            /** private */
            function hasAddedStepPage(step, currentPage, totalCount) {
                var targetPage = currentPage + step,
                    totalPage;
                if (targetPage < 1) return false;
                else {
                    totalPage = Math.ceil(totalCount / 12);
                    return targetPage <= totalPage;
                }
            }

            function getAreaDeepPath(areaCode) {
                var areaPaths = [],
                    province, city, county;
                province = AreaService.findProvince(areaCode);
                if (province) {
                    areaPaths.push(province);
                    city = AreaService.findCity(areaCode);
                    if (city) {
                        areaPaths.push(city);
                        county = AreaService.findCounty(areaCode);
                        if (county) {
                            areaPaths.push(county);
                        }
                    }

                }
                return areaPaths;
            }

            function canAreaCodeRender(scope, areaCode) {
                var groupName = AreaService.getGroupName(areaCode);
                return canGroupRender(scope, groupName);
            }

            function canGroupRender(scope, groupName) {
                var allowChooseCity = scope.allowChooseCity,
                    allowChooseProvince = scope.allowChooseProvince;
                switch (groupName) {
                    case AreaGroup.PROVINCE:
                        return allowChooseProvince === 'true';
                        break;
                    case AreaGroup.CITY:
                        return allowChooseCity === 'true';
                        break;
                    case AreaGroup.COUNTY:
                        return true;//angular.isUndefined(allowChooseCity) && angular.isUndefined(allowChooseProvince);
                        break;
                    default:
                        return false;
                        break;
                }
            }

            function isSpecialArea(cities) {
                return !(angular.isArray(cities) && cities.length > 0);
            }

            function getAreaGroupName(code) {
                return AreaService.getGroupName(code);
            }

            return {
                restrict: 'A',
                scope: {
                    /**
                     * @param arg
                     * @param arg.$event 事件对象
                     * @param arg.code 地区编号
                     * @param arg.area 地区实例
                     * @param arg.group {AreaGroup} 地区分组
                     * @return {false|*} 为 false 将终止操作
                     */
                    onBeforeSelect: '&',
                    /**
                     * @param arg
                     * @param arg.$event 事件对象
                     * @param arg.code 地区编号
                     * @param arg.area 地区实例
                     * @param arg.group {AreaGroup} 地区分组
                     */
                    onSelect: '&',
                    onBeforeClosePanel: '&',
                    onClosePanel: '&',
                    $selectedArea: '=selectedArea',
                    $areas: '=api',
                    allowChooseCity: '@',
                    allowChooseProvince: '@',
                    isDisplayPath: '@',
                    pathSeparator: '@',
                    disableHots: '@',
                    autoCloseWhenRendered: '@',
                    codeFormatter: '@',
                    isIncludeChildren: '@'
                },
                require: '?ngModel',
                link: function (scope, element, attrs, ngModelController) {
                    $tabindex.register(element, element);
                    
                    

                    var topWindow = Locations.getRealTopWindow(),
                        topJq = topWindow.$,
                        $topCompile = topJq(topWindow.document).injector().get('$compile'),
                        ctrlDown = false,
                        ctrlKey = 17,
                        cmdKey = 91,
                        cKey = 67;
                    var areaPanel = $topCompile(tmpl)(scope),
                        areas = scope.areas = new Areas({
                            scope: scope,
                            element: element,
                            attrs: attrs,
                            areaPanel: areaPanel,
                            ngModelController: ngModelController
                        }),
                        $areaGroupButtons = areaPanel.find('.form-region-tabs > li');

                    scope.showEvent = attrs.showEvent ? attrs.showEvent : "focus click";
                    //默认取配置文件的
                    if (config.controls.areas && config.controls.areas.showEvent) {
                        scope.showEvent = config.controls.areas.showEvent;
                    }
                    Locations.createHtmltoTop(areaPanel[0]);

                    scope.toggleAreaGroup = function ($event) {
                        var $element = topJq($event.target || $event.srcElement),
                            areaGroup = $element.data('area-group');
                        if ($element.is('li[data-area-group]') && $element.attr('disabled') !== 'disabled' && $element.attr('selected') !== 'true') {
                            $areaGroupButtons.filter('[selected]').removeAttr('selected');
                            $element.attr('selected', 'true');
                            areas.activeTab = areaGroup;
                        }
                    };

                    function modelValueChange(rawValue) {
                        if (ctrlDown) return;
                        if (canAreaCodeRender(scope, rawValue)) {
                            ngModelController.$render(rawValue);
                            areas.searching = false;
                            return rawValue;
                        } else if (!!rawValue && !areas.changeByInner) {
                            if (scope.$selectedArea && (scope.$selectedArea.code == rawValue || scope.$selectedArea.display == rawValue)) {
                                return scope.$selectedArea.code;
                            } else if (scope.areaName2Code && scope.areaName2Code.split("^")[0] == rawValue) {
                                return scope.areaName2Code.split("^")[1];
                            }
                            areas.search();
                        } else if (rawValue == ""){
                            areaPanel.hide();
                            delete scope.$keyword;
                            if (areas.reSearchTimer) {
                                $timeout.cancel(areas.reSearchTimer);
                                areas.reSearchTimer = undefined;
                            }
                        }
                        areas.changeByInner = false;
                    }

                    if(attrs['ngModel']){
                        // 修复地区控件的清除值后，缓存问题（空值时默认打开热门城市页面）
                        scope.$parent.$watch(attrs['ngModel'],function(newVal,oldVal){
                            if(attrs['disableHots']=="true"){
                                return;
                            }
                            if(!newVal){
                                var tabs = areaPanel.find(".form-region-tabs").children();
                                for(var i = 0 ; i < tabs.length; i++){
                                    var tab = tabs[i];
                                    if(tab.getAttribute('data-area-group')!="common"){
                                        tab.removeAttribute("selected");
                                    }
                                }
                                
                                areas.activeTab = 'common';
                            }
                            
                        });
                    }

                    ngModelController.$formatters.push(modelValueChange);
                    ngModelController.$parsers.push(modelValueChange);

                    if (!!attrs.api) {
                        scope.$areas = areas;
                    }


                    element.on(scope.showEvent, function () {
                        if (areas.__focusByClickPanel === true) {
                            areas.__focusByClickPanel = false;
                            return;
                        }
                        if (GillionMsgService.isUnderMasked(element[0])) {
                            return;
                        }
                        if (angular.isDefined(element.attr('disabled')) || element.hasClass('disabled')
                            || angular.isDefined(element.attr('readonly')) || element.hasClass('readonly')) {
                            return;
                        }

                        var elementPosition = element.position();
                        areaPanel.css({
                            top: elementPosition.top + element.outerHeight(),
                            left: elementPosition.left
                        });
                        areas.searching = false;
                        areas.selection = true;
                        if (!(scope.$$phase || scope.$root.$$phase)) {
                            scope.$digest();
                        }
                        areas.showPanel();

                        $timeout(function () {
                            element.select();
                        }, 0);
                    });

                    function clearValue () {
                        scope.areaName2Code = undefined;
                        scope.$selectedArea = undefined;
                        areas.selectedArea = areas.selectedIndex = undefined;
                        ngModelController.$setViewValue(undefined);
                        ngModelController.$render();
                    }

                    element.on('blur', function () {
                        var value = ngModelController.$modelValue;
                        if (scope.$selectedArea && scope.$selectedArea.code != value && scope.$selectedArea.display != value) {
                            clearValue();
                        }
                        if (!scope.$selectedArea && (!canAreaCodeRender(scope, value) || (scope.areaName2Code && value != scope.areaName2Code.split("^")[1]))) {
                            clearValue();
                        }
                        areas.blurTimer = $timeout(function () {
                            if (areas.searching && areas.foundAreas.length == 0){
                                clearValue();
                            }
                            if (areas.searching && areas.foundAreas && areas.foundAreas.length == 1){
                                var groupName = getAreaGroupName(areas.foundAreas[0].code);
                                areas.selectedArea = areas.foundAreas[0];
                                areas['select_' + groupName]();
                                areas.renderGroupBtnAttrs(groupName);
                                ngModelController.$setViewValue(areas.foundAreas[0].code);
                                ngModelController.$render();
                            }
                            if (angular.isUndefined(ngModelController.$viewValue)) {
                                $areaGroupButtons.filter('[selected]').removeAttr('selected');
                                if (scope.disableHots === 'true') {
                                    $areaGroupButtons.first().attr('selected', 'true');
                                    areas.activeTab = AreaGroup.PROVINCE;
                                } else {
                                    areas.activeTab = AreaGroup.COMMON;
                                }
                            }
                            areas.closePanel();
                        }, 200);
                    });

                    element.on('keydown', function (event) {
                        if (event.keyCode == ctrlKey || event.keyCode == cmdKey) {
                            ctrlDown = true;
                            event.preventDefault();
                        }
                        if (event.keyCode === 38 || event.keyCode === 40) {
                            event.stopPropagation();
                        }
                        if (!(ctrlDown && event.keyCode == cKey)) {
                            areas.nav(event);
                        }
                    });

                    element.on('keyup', function (event) {
                        if (event.keyCode == ctrlKey || event.keyCode == cmdKey) ctrlDown = false;
                    });

                    scope.$on('$destroy', function () {
                        delete scope.areaName2Code;
                        element.remove();
                        areaPanel.remove();
                    });
                }
            };
        }])
        .factory('AreaService', ['Arrays', 'Predicates', '$q', AreaServiceConstructor])
        .factory('Locations', GillionLocationServiceConstructor);
});
