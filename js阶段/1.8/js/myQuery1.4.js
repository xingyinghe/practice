function $(el){
    var firstLetter = el.substr(0, 1);
    var name = el.substr(1);
    if (firstLetter == '#'){
        return document.getElementById(name);
    }else if(firstLetter == '.'){
        return document.getElementsByClassName(name);
    }else{
        return document.getElementsByTagName(el);
    }
}

/**
 * 获取滚动条距离顶部和左侧的距离，兼容IE6+,Firefox,Chrome等
 */
function scroll(){
    // 判断是否有window.pageXOffset
    if (window.pageYOffset){
        return {
            top: pageYOffset,
            left: pageXOffset
        };
    }
    // 再判断是否有声明DTD
    else if(document.compatMode == 'BackCompat'){
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
    // 默认使用documentElement
    else{
        return {
            top: document.documentElement.scrollTop,
            left: document.documentElement.scrollLeft
        }
    }
}

function client(){
    if (window.innerWidth){ // IE9+或其它浏览器
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }else if(document.compatMode === "CSS1Compat"){
        return {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }else{
        return{
            width: document.body.clientWidth,
            height: document.body.clientHeight
        }
    }
}

/**
 * 缓动框架
 * @param obj       需要移动的标签
 * @param target    移动的参数
 * @param callback  接收调用者传递的回调函数
 */
function animation(obj, target, callback){
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        var isClearInterval = true;     // 记录是否需要清除定时
        for (var key in target){
            var t = target[key]; // 目标位置
            var c = getStyle(obj, key);  // 当前位置

            // 判断key有没有是opacity
            if (key === 'opacity'){
                c = Math.round(c * 100);
                // 如果传值取整是0，表示参数是小数需要*100，否则取数字本身
                t = parseInt(t) == 0 || parseInt(t) == 1 ? t * 100 : t;
            }else{
                c = parseInt(c);    // 去除返回的单位
            }
            // (目标 - 当前) / 10
            var s = (t - c) / 10;   // 每次移动的距离
            s = s > 0 ? Math.ceil(s) : Math.floor(s);
            if (key === 'opacity'){
                obj.style[key] = (c + s) / 100;
                obj.style.filter = '(alpha='+(c+s)+')';
            }else {
                var unit = key == 'width' ||
                            key == 'height' ||
                            key == 'left' ||
                            key == 'top' ? 'px' : '';
                obj.style[key] = c + s + unit;
            }
            if (c + s != t){ // 判断是否移动到目录位置
                isClearInterval = false;
            }
        }
        if (isClearInterval){   // 只有所有的目标都到达预定位置才能清除定时器
            clearInterval(obj.timer);
            /*
            当动画执行完成以后，再判断是否有需要执行callback
            判断用户是否有传递回调函数，如果有执行回调函数
             */
            if (callback){
                callback(); // 执行回调函数
            }
        }
    }, 10);
}

/**
 * 获取标签的样式
 * @param obj       获取样式的对象
 * @param property  获取的属性名称
 */
function getStyle(obj, property){
    if (window.getComputedStyle){
        return window.getComputedStyle(obj, null)[property];
    }else{  // IE678
        return obj.currentStyle[property];
    }
}

/**
 * 兼容ie678的事件添加
 * @param obj       需要添加事件的标签对象
 * @param event     添加的事件
 * @param fn        事件的处理过程
 */
function  addEvent(obj, event, fn) {
    if (obj.addEventListener){
        obj.addEventListener(event, fn);
    }else{  // IE678
        obj.attachEvent('on'+event, fn);
    }
}