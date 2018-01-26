var jd = {};

/**
 * 给对象添加过渡的动画
 * @param obj       需要添加过渡动画的对象
 */
jd.addTransition = function(obj){
    obj.style.transition = 'all 0.5s';
    obj.style.webkitTransition = 'all 0.5s';
};
/**
 * 设置对象的变形行为
 * @param obj       需要变形的对象
 * @param dis       移动的距离
 * @param dir       x或y
 */
jd.setTransform = function(obj, dis, dir){
    obj.style.transform = 'translate' + dir.toUpperCase() + '(' + dis + 'px)';
    obj.style.webkitTransform = 'translate' + dir.toUpperCase() + '(' + dis + 'px)';
};
/**
 * 移除对象的过渡动画行为
 * @param obj       需要移除过渡的对象
 */
jd.removeTransition = function(obj){
    obj.style.transition = '';
    obj.style.webkitTransition = '';
};
/**
 * 当过度完成时，调用fn函数
 * @param obj       需要监听过度完成的对象
 * @param fn        调用的函数
 */
jd.addTransitionEnd = function(obj, fn){
    obj.addEventListener('transitionEnd', fn);
    obj.addEventListener('webkitTransitionEnd', fn);
};
/**
 * 监听触摸按钮时的点击事件
 */
jd.tip = function(obj, fn){
    var start = 0;  // 保存触摸到屏幕的开始时间
    var end = 0;    // 离开屏幕的时间
    var spend = 0;  // 触摸到离开花费的时长
    var isMove = false; // 记录是否有移动过手指
    obj.addEventListener('touchstart', function(){
        start = Date.now();//获取当前的毫秒数
    });
    obj.addEventListener('touchmove', function(){
        isMove = true;//移动过手指
    });
    obj.addEventListener('touchend', function(){

        end = Date.now();//获取手指离开时的毫秒数
        spend = end - start;// 触摸到离开花费的时长
        if (!isMove && spend<200){//如果没有移动并且按下的时长小于200毫秒
            if(fn){
                fn();
            }
        }
        // 重置变量
        isMove = false;
    });
};