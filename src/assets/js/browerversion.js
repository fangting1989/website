function getElementsByClassName(searchClass, node, tag) {
    if (document.getElementsByClassName) {
        var nodes = (node || document).getElementsByClassName(searchClass), result = [];
        for (var i = 0; node = nodes[i++];) {
            if (tag !== "*" && node.tagName === tag.toUpperCase()) {
                result.push(node)
            }
        }
        return result
    } else {
        node = node || document;
        tag = tag || "*";
        var classes = searchClass.split(" "),
            elements = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag),
            patterns = [],
            current,
            match;
        var i = classes.length;
        while (--i >= 0) {
            patterns.push(new RegExp("(^|\\s)" + classes[i] + "(\\s|$)"));
        }
        var j = elements.length;
        while (--j >= 0) {
            current = elements[j];
            match = false;
            for (var k = 0, kl = patterns.length; k < kl; k++) {
                match = patterns[k].test(current.className);
                if (!match) break;
            }
            if (match) result.push(current);
        }
        return result;
    }
}
function browserVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge浏览器
    var isFirefox = userAgent.indexOf("Firefox") > -1; //Firefox浏览器
    var isOpera = userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1; //Opera浏览器
    var isChrome = userAgent.indexOf("Chrome") > -1 && userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Chrome浏览器
    var isSafari = userAgent.indexOf("Safari") > -1 && userAgent.indexOf("Chrome") == -1 && userAgent.indexOf("Edge") == -1 && userAgent.indexOf("OPR") == -1; //Safari浏览器
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 'IE7';
        } else if (fIEVersion == 8) {
            return 'IE8';
        } else if (fIEVersion == 9) {
            return 'IE9';
        } else if (fIEVersion == 10) {
            return 'IE10';
        } else {
            return 'IE6';//IE版本<7
        }
    } else if (isIE11) {
        return 'IE11';
    } else if (isEdge) {
        return 'Edge' + userAgent.split('Edge/')[1].split('.')[0];
    } else if (isFirefox) {
        return 'Firefox' + userAgent.split('Firefox/')[1].split('.')[0];
    } else if (isOpera) {
        return 'Opera' + userAgent.split('OPR/')[1].split('.')[0];
    } else if (isChrome) {
        return 'Chrome' + userAgent.split('Chrome/')[1].split('.')[0];
    } else if (isSafari) {
        return 'Safari'; +userAgent.split('Safari/')[1].split('.')[0];
    } else {
        return -1;//不是ie浏览器
    }
}

function browserVersion_judge() {
    if (browserVersion().indexOf("IE") > -1){
        var loader = document.getElementById("preloader-ami");
        loader.style.display = "none"
    }
    if (browserVersion().indexOf("IE") == -1) {
        document.getElementById("ieBrower").style.display = "none"
    } else {
        document.getElementById("ieBrower").style.display = "block"
    }
}

