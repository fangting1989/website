WebConfig =
        {
                loginTitle:'稻普控股',
                pageTitle:'稻普控股',
                headTitle: '稻普控股',
                CompanyName:'稻普控股',
                BaseUrl: 'http://guokai.zjdiepu.com/apiservice/',
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
                        baseservice:"baseservice/",
                        fileuploadpath:"baseservice/",
                        sellsiteservice:'sellsite-service/',
                        dpworkservice:'dpworkservice/',
                        dpguokaiservices:'dpguokai-services/',
                        dppaimaiservices:'dppaimai-services/',
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