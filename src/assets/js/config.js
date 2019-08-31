WebConfig =
        {
                loginTitle:'后台内容管理平台',
                pageTitle:'后台内容管理平台',
                headTitle: '瑞懿科技',  
                CompanyName:'瑞懿科技', //版权公司
                BaseUrl: '',
                // BaseUrl: 'http://hhr.zjdiepu.com/apiservice/',
                UserObjectCookie:{
                        name:'__mkweb-website-user-cookies',
                        type:'s',
                        expire:2400
                },
                EnterPriseCookie:{
                        name:'__mkweb-website-enterprise-cookies',
                        type:'s',
                        expire:2400
                },
                TokenCookie: {
                        name:'__mkweb-website-token-cookies',
                        type:'s',
                        expire:2400
                },
                Token: false, 
                RequestUrl: { 
                        baseservice:'http://127.0.0.1:8020/',
                        fileuploadpath:"http://127.0.0.1:8020/", 
                        sellsiteservice:'http://127.0.0.1:8220/',
                        dpworkservice:'http://127.0.0.1:8700/',
                        // baseservice:'http://111.231.206.166:8800/' + "baseservice/",
                        // fileuploadpath:"http://111.231.206.166:8800/baseservice/",
                        // sellsiteservice:"sellsite-service/",
                        flowableworkflow:'http://127.0.0.1:8400/',
                        dpcarworkservice:'http://127.0.0.1:8750/',
                        // baseservice:"baseservice/",
                        // fileuploadpath:"baseservice/",
                        // sellsiteservice:'sellsite-service/',
                        // dpworkservice:'dpworkservice/',
                        dpguokaiservices:'http://127.0.0.1:8230/',
                        // dpguokaiservices:'dpguokai-services/',

                },
                hhr:{
                        100:{
                                one:{xc:6,esc:7},
                                two:{xc:9,esc:11}
                        },
                        50:{
                                one:{xc:7,esc:8},
                                two:{xc:10,esc:12}
                        }
                        
                },
                rolecode:{
                        zxsh:'C6DCBD970F76762D',
                        zsys:'ABD3999995F7F758'
                }

        }    