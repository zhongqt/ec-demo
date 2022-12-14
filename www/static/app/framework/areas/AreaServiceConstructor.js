define('framework/areas/AreaServiceConstructor', [
    'require',
    'angular',
    'config.properties'
], function (require, angular, config) {
    var provincesNode = [];
    var provincesTree = [provincesNode];
    var commonAreas = [];
    var allProvinces = [];
    var Areas = {
        provincesTree: provincesTree,
        commonAreas: commonAreas
    };
    var allAreasLoaded = false;

    require([config.controls.areas.areasJsFilePath], function(allAreas) {
        Array.prototype.push.apply(provincesNode, allAreas.provincesTree[0]);
        allAreas.provincesTree[0] = provincesNode;
        provincesTree.shift();
        Array.prototype.push.apply(provincesTree, allAreas.provincesTree);
        Array.prototype.push.apply(commonAreas, allAreas.commonAreas);
        angular.forEach(Areas.provincesTree, function (provinceGroupPage) {
            angular.forEach(provinceGroupPage, function (provinceGroup) {
                angular.forEach(provinceGroup.provinces, function (province) {
                    allProvinces.push(province);
                });
            });
        });
        allAreasLoaded = true;
        dispatchEvent(document, 'allAreasLoaded');
    });

    return function (Arrays, Predicates, $q) {
        return {

            AreaGroup: {
                COMMON: 'common',
                PROVINCE: 'province',
                CITY: 'city',
                COUNTY: 'county'
            },

            allAreasLoadedPromise: function() {
                var deferred = $q.defer();
                if (allAreasLoaded) {
                    deferred.resolve();
                } else {
                    var eventName = 'allAreasLoaded.' + Math.floor(Math.random() * 10000);
                    $(document).on(eventName, function() {
                        $(document).off(eventName);
                        deferred.resolve();
                    });
                }
                return deferred.promise;
            },

            getAllProvince: function () {
                return allProvinces;
            },

            getProvinceGroupPages: function () {
                return Areas.provincesTree;
            },

            getCommonAreas: function () {
                return Areas.commonAreas;
            },

            /**
             * ??????????????????????????????????????????
             * @param code {String} ????????????
             * @param [group] {String} ????????????
             */
            getAreaChildren: function (code, group) {
                var pascalGroupName;
                if (group) {
                    pascalGroupName = group.charAt(0).toUpperCase() + group.substr(1);
                    var groupName = this['findRaw'+ pascalGroupName](code);
                    return (groupName && groupName.l) || [];
                }
                var rawArea = this.findRawArea(code);
                var l = rawArea ? rawArea : [];
                return l || [];
            },

            /**
             * @param code ????????????
             * @return {boolean} ???????????????????????????
             */
            isProvinceCode: function (code) {
                return /^(?:0[1-9]|[1-9]\d)(?:0000)?$/.test(code);
            },

            /**
             * @param code ????????????
             * @return {boolean} ???????????????????????????
             */
            isCityCode: function (code) {
                return /^(?:0[1-9]|[1-9]\d)(?:0[1-9]|[1-9]\d)(?:00)?$/.test(code);
            },

            /**
             * @param code ????????????
             * @return {boolean} ???????????????????????????
             */
            isCountyCode: function (code) {
                return /^(?:0[1-9]|[1-9]\d)(?:0[1-9]|[1-9]\d)(?:0[1-9]|[1-9]\d)$/.test(code);
            },

            isAreaCode: function (code) {
                return /^(?:0[1-9]|[1-9]\d)(?:\d{2})?(?:\d{2})?$/.test(code);
            },

            isFullAreaCode: function (code) {
                return /^(?:0[1-9]|[1-9]\d)(?:\d{2})(?:\d{2})$/.test(code);
            },

            findRawProvince: function (provinceCode) {
                var allProvince = this.getAllProvince();
                if (provinceCode) {
                    return Arrays.findOne(allProvince, Predicates.newPropValEqPredicate("c", provinceCode.substr(0, 2) + '0000'));
                }
            },

            findRawCity: function (cityCode) {
                var rawProvince = this.findRawProvince(cityCode);
                if (rawProvince && angular.isArray(rawProvince.l)) {
                    return Arrays.findOne(rawProvince.l, Predicates.newPropValEqPredicate('c', cityCode.substr(0, 4) + '00'));
                }
            },

            findRawCounty: function (countyCode) {
                var rawCity = this.findRawCity(countyCode);
                if (rawCity && angular.isArray(rawCity.l)) {
                    return Arrays.findOne(rawCity.l, Predicates.newPropValEqPredicate('c', countyCode));
                }
            },

            findProvince: function (provinceCode) {
                var rawProvince = this.findRawProvince(provinceCode);
                return this.transformerRawArea(rawProvince);
            },

            findCity: function (cityCode) {
                var rawCity = this.findRawCity(cityCode);
                return this.transformerRawArea(rawCity);
            },

            findCounty: function (countyCode) {
                var rawCounty = this.findRawCounty(countyCode);
                return this.transformerRawArea(rawCounty);
            },

            findRawArea: function (areaCode) {
                if (this.isProvinceCode(areaCode)) {
                    return this.findRawProvince(areaCode);
                } else if (this.isCityCode(areaCode)) {
                    return this.findRawCity(areaCode);
                } else {
                    return this.findRawCounty(areaCode);
                }
            },

            /**
             * ????????????????????????????????????
             * @param areaCode {String} ????????????
             * @return {{code: String, name: String}} ????????????
             */
            findArea: function (areaCode) {
                var rawArea = this.findRawArea(areaCode);
                return this.transformerRawArea(rawArea);
            },

            getGroupName: function (areaCode) {
                var me = this,
                    AreaGroup = me.AreaGroup;
                if (me.isAreaCode(areaCode)) {
                    if (me.isProvinceCode(areaCode)) {
                        return AreaGroup.PROVINCE;
                    } else if (me.isCityCode(areaCode)) {
                        return AreaGroup.CITY;
                    } else if (me.isCountyCode(areaCode)) {
                        return AreaGroup.COUNTY;
                    }
                }
            },

            /**
             *
             * @param area {Object} ??????????????????
             * @param area.c {String} ????????????
             * @param area.n {String} ????????????
             *
             * @return {{code: String, name: String}} ????????????
             */
            transformerRawArea: function (area) {
                var me = this;
                if (area) {
                    return {
                        code: area.c,
                        name: area.n
                    }
                }
            },
            
            transformerRawArea2: function (area) {
                var me = this;
                if (area) {
                    return {
                        code: area.c,
                        name: area.n,
                        alphabetRange: area.alphabetRange
                    }
                }
            },

            transformerRawAreaList: function (rawAreaList) {
                var me = this;
                var areaList = [];
                angular.forEach(rawAreaList, function(rawArea) {
                    areaList.push(me.transformerRawArea2(rawArea))
                });
                return areaList;
            },

            getCodeFormatter: function (formatterType) {
                var me = this;
                formatterType = formatterType || config.controls.areas.codeFormatter;
                switch (formatterType) {
                    case 'kxtx':
                        return function (code) {
                            if (me.isProvinceCode(code)) {
                                return code.substr(0, 2);
                            } else if (me.isCityCode(code)) {
                                return code.substr(0, 4);
                            } else {
                                return code;
                            }
                        };
                        break;
                    default :
                        return angular.identity;
                }
            }
        }
    }

    function dispatchEvent(element,event){
        if (document.createEventObject){
            var evt = document.createEventObject();
            return element.fireEvent('on' + event, evt)
        } else {
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent(event, true, true);
            return !element.dispatchEvent(evt);
        }
    }
});
