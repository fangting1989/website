WebConfig =
        {
                loginTitle:'后台内容管理平台',
                pageTitle:'后台内容管理平台',
                headTitle: '拍卖系统',
                CompanyName:'稻普控股',
                BaseUrl: 'http://pm.zjdiepu.com/apiservice/',
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
                        dppaimaiservices:'dppaimai-services/',
                },
        }    