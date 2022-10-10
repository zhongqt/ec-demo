window.__qx_ctx = '/ec-demo';
define({
    dict_config: {
        method: "get",
        url: "/ec-demo/system/employees/queryDict",
        daoService: ""
    },
    $window_$config: {
        ctx: '',
        path: '',
        locale: 'zh-cn'
    },
    stopRepeatUrlPatterns: [
        '/'
    ],
    html: {
        // input: {
        //     // gDbc: true
        // }
    },
    daoServiceConfig: {
        projectId: 'devProject',
        serverUrl: 'http://172.16.0.212:8083/dao/'
    },
    controls: {
        resource: {
            httpRequestEventDelayTime: 1000
        },
        associate: {
            preventTabindex: true
        },
        dropdown: {
            associateType: "selectFirst",
            showEvent: "click",
            displayCode: "-",
            lazyRenderDropItems: 'readonly' //  none - 默认值，不延迟渲染下拉列表   all - 延迟渲染所有下拉列表   readonly - 延迟渲染只读或禁用的下拉列表
        },
        dataGrid: {
            disableCopyEditing: true,
            keydownNewRow: true
        },
        $prepareLoadModules: [],
        areas: {
        // codeFormatter: 'kxtx',
        //     areasJsFilePath: '/html/demo/areas/allAreas.js'
        // searchingUrl: '/gschool/areas/search'
        },
        uploader: {
            showDeleter: 'always',
            urls: {
                uploadPrefix: '/cloud/filesystem/uploadFile/',
                downloadPrefix: '/cloud/filesystem/downloadFile/',
                deletePrefix: '/cloud/filesystem/deleteFile/',
                getStrategyPrefix: '/cloud/filesystem/getStrategy/',
                getFileInfosByStrategyId: '/cloud/filesystem/getFileInfos/',
                getSnapshotUploadPrefix: '/cloud/filesystem/uploadSnapshot/'
            },
            unknownClass: 'fi-file-rar',
            previewClassExtMap: {
                'fi-file-word': ['docx', 'dotx', 'doc', 'dot', 'docm', 'xps', 'rtf', 'wtf', 'odt'],
                'fi-file-pdf': ['pdf'],
                'fi-file-excel': ['xlsx', 'xlsm', 'xlsb', 'xltx', 'xltm', 'xls', 'xlt', 'xls', 'xml', 'xlam', 'xla', 'xlw', 'csv'],
                'fi-file-ppt': ['pptx', 'pptm', 'ppt', 'xps', 'potx', 'potm', 'pot', 'thmx', 'pps', 'ppsm', 'ppam', 'ppa'],
                'fi-file-rar': ['rar', 'zip', 'zz', 'zix', 'zipx', 'z', 'yz', 'war', 'tgz', 'rpm', 'rz', 'jar', 'gzip']
            }
        },
        pauseClick: {
            pauseTime: 5000
        },
        uniqueSync: true,
        repeatRequestInterceptor: {
            /**
             * @cfg title {String}
             * @cfg message {String}
             */
            repeatMsgOptions: {
                title: '错误',
                message: '请不要重复提交'
            },
            sessionUserIdProp: '$sessionAttrs.loginUser.userId',
            handleUrlPatterns: ['/ec-demo/system/employees/*']
        },
        validation: {
            fieldErrorsTransformer: undefined,
            chineseWidth: 3,
            verifyOnSubmit: false,
            messenger: 'messageBoxMessenger'
        },
        date: {
            showOnFocus: false
        },
        time: {
            showOnFocus: false
        },
        handsontable: {
            filters_width: 100,
            filters_height: 100
        },
        datasource: {
            method: 'post',
            paramParser: 'form'
        },
        penetration: 'ctrl'
    },
    $paths: {
        $current: {
            ctx: '/ec-demo',
            path: ''
        },
        tms: {
            ctx: 'http://tms.kxtx.cn/kxtx-tms',
            path: 'http://tms.kxtx.cn'
        },
        oms: {
            ctx: 'http://oms.kxtx.cn/kxtx-oms',
            path: 'http://oms.kxtx.cn'
        },
        crm: {
            ctx: 'http://crm.kxtx.cn/kxtx-crm',
            path: 'http://crm.kxtx.cn'
        },
        wms: {
            ctx: 'http://wms.kxtx.cn/kxtx-wms',
            path: 'http://wms.kxtx.cn'
        }
    }
});
