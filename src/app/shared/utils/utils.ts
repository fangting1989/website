import { _ } from 'underscore';
/**
 * 转化成RMB元字符串
 * @param digits 当数字类型时，允许指定小数点后数字的个数，默认2位小数
 */
// tslint:disable-next-line:no-any
export const Utils: any = {
  yuan: function (value: any, digits: number = 2) {
    if (typeof value === 'number')
      value = value.toFixed(digits);
    return `&yen ${value}`;
  },
  IsStringNullOrEmpty: function (a: any) {
    if (a != null && typeof (a) !== 'undefined') {
      a = a + "";
    }
    if (a != null && typeof (a) !== 'undefined' && typeof (a) === 'string' && a.trim() !== '') {
      return false
    } else {
      return true;
    }
  },
  checkNum: function (v) {
    var re = /^[0-9]*[1-9][0-9]*$/
    return re.test(v)
  },
  checkPrice: function (v) {
    var re = /^[0-9]*[0-9][0-9]*\.?[0-9]{0,2}$/
    return re.test(v)

  },
  checkEmail: function (v) {
    var re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return re.test(v)
  },
  checkPhone: function (v) {
    var re = /^1[3456789]\d{9}$/
    return re.test(v)
  },
  checkFloat: function (v, bit) {//bit 几位小数
    //var st = '^[0-9]+[0-9]*\\.+[0-9]{0,' + bit + '}$'
    //var st = '^(([0-9]+\\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\\.[0-9]+)|([0-9]*[1-9][0-9]*))$'
    var st = '^(([0-9]+\\.+[0-9]{1,' + bit + '})|([0-9]*[1-9][0-9]*\\.+[0-9]{1,' + bit + '})|([0-9]*[1-9][0-9]*))$'
    var re = new RegExp(st)
    return re.test(v)
  },
  /**
	** 加法函数，用来得到精确的加法结果
	*/
  accAdd: function (arg1: any, arg2: any) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    return (arg1 * m + arg2 * m) / m;
  },
  /**
  ** 减法函数，用来得到精确的减法结果
  */
  accSub: function (arg1, arg2) {
    var r1, r2, m, n;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2));
    //动态控制精度长度
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  /**
  ** 乘法函数，用来得到精确的乘法结果
  */
  accMul: function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  /** 
  ** 除法函数，用来得到精确的除法结果
  */
  accDiv: function (arg1, arg2) {
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
  },
  getRequest: function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },

  formatCityArray: function (data, length) {
    if (!data) {
      return []
    }
    if (data.length == 0) {
      return []
    }
    var nArray = []
    var lastvalue = "";
    while (data.length > 0) {
      var newData = data.substr(0, length)
      lastvalue = lastvalue + newData;
      nArray.push(lastvalue)
      data = data.substr(length, data.length - length)
      if (data.length < length) {
        if (data.length > 0) {
          lastvalue = lastvalue + data;
          nArray.push(lastvalue)
        }
        data = ""
      }
    }
    return nArray
  },
  enumcity: function (enumvalue: any, mode?: any, split_char?: any) {
    mode = mode == null ? 1 : mode //1:返回解析 2:返回全链路
    split_char = split_char == null ? "-" : split_char
    var citydata = chinaCity
    var resultdata = null;
    _.each(citydata, it => {
      if (enumvalue == it.code) {
        resultdata = it.name
      }
      if (!resultdata) {
        _.each(it.children, it_child => {
          if (enumvalue == it_child.code) {
            if (mode == 1) {
              resultdata = it_child.name
            } else if (mode == 2) {
              resultdata = it.name + split_char + it_child.name
            } else {
              resultdata = ""
            }
          }
          if (!resultdata) {
            _.each(it_child.children, it_child_child => {
              if (enumvalue == it_child_child.code) {
                if (mode == 1) {
                  resultdata = it_child_child.name
                } else if (mode == 2) {
                  resultdata = it.name + split_char + it_child.name + split_char + it_child_child.name
                } else {
                  resultdata = ""
                }
              }
            })
          }
        })
      }
    })
    return resultdata == "" ? enumvalue : resultdata;
  },
  deepClone: function (item: any) {
    const target = item.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
    for (let keys in item) { // 遍历目标
      if (item.hasOwnProperty(keys)) {
        if (item[keys] && typeof item[keys] === 'object') { // 如果值是对象，就递归一下
          target[keys] = item[keys].constructor === Array ? [] : {};
          target[keys] = this.deepClone(item[keys]);
        } else { // 如果不是，就直接赋值
          target[keys] = item[keys];
        }
      }
    }
    return target;
  },
  //解析枚举
  enumname: function (enums: any, explainname: any, enumcol: any, split_char?: any) {
    split_char = split_char == null ? "," : split_char;
    if (!enumcol) {
      return enumcol;
    }
    var enums_enumcol = enumcol.split(split_char);
    var result_enum_name = "";
    _.each(enums, iit => {
      if (iit.explainenname == explainname) {
        _.each(iit.enums, enumitem => {
          _.each(enums_enumcol, enumdata => {
            if (enumitem.enumvalue == enumdata) {
              result_enum_name += (result_enum_name == "" ? "" : ",") + enumitem.enumname
            }
          })
        })
      }
    })
    return result_enum_name == "" ? enumcol : result_enum_name;
  },
  /**
   * 采用canvas压缩图片
   * @param path 路径
   * @param obj  压缩目标对象
   * @param callback 
   */
  canvasDataURL: function (path, obj, callback) {
    var img = new Image();
    img.src = path;
    img.onload = function () {
      var that: any = this;
      // 默认按比例压缩
      var w = that.width,
        h = that.height,
        scale = w / h;
      w = obj.width || w;
      h = obj.height || (w / scale);
      var quality = 0.7;  // 默认图片质量为0.7
      //生成canvas
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      // 创建属性节点
      var anw = document.createAttribute("width");
      anw.nodeValue = w;
      var anh = document.createAttribute("height");
      anh.nodeValue = h;
      canvas.setAttributeNode(anw);
      canvas.setAttributeNode(anh);
      ctx.drawImage(that, 0, 0, w, h);
      // 图像质量
      if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
        quality = obj.quality;
      }
      // quality值越小，所绘制出的图像越模糊
      var base64 = canvas.toDataURL('image/jpeg', quality);
      // 回调函数返回base64的值
      callback(base64);
    }
  },

  /**
   * 将以base64的图片url数据转换为Blob
   * @param urlData
   *            用url方式表示的base64图片数据
   */
  convertBase64UrlToBlob: function (urlData) {
    var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  },
  showSize(base64url) {
    //获取base64图片大小，返回MB数字
    var str = base64url.replace('data:image/png;base64,', '');
    var equalIndex = str.indexOf('=');
    if (str.indexOf('=') > 0) {
      str = str.substring(0, equalIndex);
    }
    var strLength = str.length;
    var fileLength = parseInt(strLength) - (parseInt(strLength) / 8) * 2;
    // 由字节转换为MB
    var size = "";
    size = (fileLength / (1024 * 1024)).toFixed(2);
    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    var dou = sizeStr.substr(index + 1, 2)            //获取小数点后两位的值
    if (dou == "00") {                                //判断后两位是否为00，如果是则删除00                
      return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }
    return parseInt(size);
  }
}
