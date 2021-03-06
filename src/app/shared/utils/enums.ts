import {shopEnums} from './shopenum';
import {paimaiEnums} from './paimaienum';
export const Enums:any = {
    stateArray: [{name:"是",value:1,selected:false},{name:"否",value:0,selected:true}],
    paytypeArray:[{name:'微信',value:1},{name:'支付宝',value:2}],
    partnertypeArray:[{name:'个人',value:1},{name:'企业',value:2}],
    dzqkArray:[{name:'公司垫资',value:1},{name:'自行垫资',value:2}],
    dzfArray:[{name:'日息0.5‰',value:1},{name:'费率中包含',value:2}],
    fromtype:[{name:'后台输入',value:1},{name:'导入',value:2},{name:'微信',value:3}, { name: '微信录入', value: 4 }],
    customertype:[{name:'潜力客户',value:1},{name:'意向客户',value:2}],
    partnerfromtype:[{name:'录入',value:1},{name:'分享获得',value:2}],
    partnerisvalid:[{name:'填写信息',value:1000},{name:'修改政策',value:1005},
        {name:'政策审核',value:1008},
        {name:'业务分配',value:1010},
        {name:'信息录入',value:1020},
        {name:'补充材料',value:1025},
        {name:'上传汇款单',value:1030},
        {name:'上传收款单',value:1040},{name:'填写报告',value:1050},
        {name:'报告预审',value:1060},{name:'评审一审',value:1065},{name:'评审二审',value:1070},
        {name:'终审',value:1080},{name:'已完成',value:1090},
        {name:'已拒绝',value:1095},
        {name:'完成',value:1100},
       ],
    outmoneyisvalid:[{name:'招商初审',value:1000,partname:'招商部'},{name:'分公司主审',value:1010,partname:'分公司'},
    {name:'集团终审',value:1020,partname:'集团'},{name:'审批不通过',value:1025},{name:'待打款',value:1030},{name:'完成',value:1040}],
    ComponentState:{
        Success:{
            code:99,
            msg:'检测通过'
        },
        Error:{
            code:-1,
            msg:'数据保存'
        }
    },
    ComponentMode:[{name:'只读',value:1},{name:'编辑',value:2}],
    ...shopEnums,
    ...paimaiEnums,
}