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
 * 版本1的动画函数
 * @param obj       需要移动的标签对象
 * @param target    移动到的x位置
 */
function animation(obj, target){
    clearInterval(obj.timer);
    // 现在位置大于目标位置需要往左移动，否则向右移动
    var speed = -10 * (obj.offsetLeft<target?-1:1);
    obj.timer = setInterval(function(){
        if (obj.offsetLeft == target){
            // 到达指定位置后结束移动
            clearInterval(obj.timer);
            return;
        }
        obj.style.left = obj.offsetLeft + speed + 'px';
    }, 1000/100);
}