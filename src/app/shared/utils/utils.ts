/**
 * 转化成RMB元字符串
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
// tslint:disable-next-line:no-any
export const Utils:any = {
  yuan:function(value: any, digits: number = 2){
    if (typeof value === 'number') 
      value = value.toFixed(digits);
    return `&yen ${value}`;
  },
  IsStringNullOrEmpty:function(a:any){
    if( a!=null && typeof(a)!=='undefined' && typeof(a)==='string' &&a.trim()!=='' ) {
      return false
    }else{
      return true;
    }
  },
  checkNum:function(v){
    var re=/^[0-9]*[1-9][0-9]*$/
    return re.test(v)
  },
  checkPrice:function(v){
      var re=/^[0-9]*[0-9][0-9]*\.?[0-9]{0,2}$/
      return re.test(v)

  },
  checkEmail:function(v){
      var re=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return re.test(v)
  },
  checkPhone:function(v){
      var re=/^1[3456789]\d{9}$/
      return re.test(v)
  },
  checkFloat:function(v,bit){//bit 几位小数
      var st='^[0-9]+[0-9]*\\.+[0-9]{0,'+bit+'}$'
      var re=new RegExp(st)
      return re.test(v)
  },
  /**
	** 加法函数，用来得到精确的加法结果
	*/
  accAdd:function(arg1:any, arg2:any) {
    var r1, r2, m;
    try {r1 = arg1.toString().split(".")[1].length} catch (e) {r1 = 0}
    try {r2 = arg2.toString().split(".")[1].length} catch (e) {r2 = 0}
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  /**
  ** 减法函数，用来得到精确的减法结果
  */
  accSub:function(arg1, arg2) {
    var r1,r2,m,n;
      try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
      try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
      m=Math.pow(10,Math.max(r1,r2));
      //动态控制精度长度
      n=(r1>=r2)?r1:r2;
      return ((arg1*m-arg2*m)/m).toFixed(n);
  },
  /**
  ** 乘法函数，用来得到精确的乘法结果
  */
  accMul:function(arg1, arg2) {
      var m=0,s1=arg1.toString(),s2=arg2.toString();
      try{m+=s1.split(".")[1].length}catch(e){}
      try{m+=s2.split(".")[1].length}catch(e){}
      return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
  },
  /** 
  ** 除法函数，用来得到精确的除法结果
  */

  getRequest:function(name){
      var reg = new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null) return unescape(r[2]);
      return null;
  },
  accDiv:function (arg1, arg2) {
      if (isNaN(arg1)) {
          arg1 = 0;
      }
      if (isNaN(arg2)) {
          arg2 = 0;
      }
      arg1 = Number(arg1);
      arg2 = Number(arg2);
      
      var t1 = 0, t2 = 0, r1, r2;
      try {
          t1 = arg1.toString().split(".")[1].length;
      }
      catch (e) {
      }
      try {
          t2 = arg2.toString().split(".")[1].length;
      }
      catch (e) { 
      }
      r1 = Number(arg1.toString().replace(".", ""));
      r2 = Number(arg2.toString().replace(".", ""));
      return (r1 / r2) * Math.pow(10, t2 - t1);
  }

}
