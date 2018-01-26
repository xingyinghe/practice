window.onload = function(){
    goBack();
    swipe('.jd_cate_left');
    // swipe('.jd_cate_right .mask');
    addTipEvent('.jd_cate_left ul');
};

function swipe(str){
    var parent = document.querySelector(str);
    var ul = parent.querySelector('ul');
    //var h = parent.offsetHeight;
    var h = parent.offsetHeight;
    var H = ul.offsetHeight;

    // 顶部和底部拖拽时的缓冲距离
    var distance = 100;
    // 最大定位距离
    var maxPosition = 0;
    // 最小定位距离
    var minPosition = h - H;
    var maxSwipe = distance+maxPosition;
    var minSwipe = -distance+minPosition;
    ul.currentY = 0;

    ul.addEventListener('touchstart', function(e){
        //得到触摸屏幕时的y值，用来后期判断手指是否上下滑动
        ul.startY = e.touches[0].pageY;
    });
    //监听是否移动过手指
    ul.addEventListener('touchmove', function(e){
        //得到ul移动后的y值
        ul.endY = e.touches[0].pageY;
        //移动后的距离等于结束的减去开始的
        var move = ul.endY - ul.startY;
        ul.isMove = true;
        //如果移动了，ul的y值加上移动的距离小于最大的定位距离，并且大于最小定位距离，

        if (ul.currentY+move< maxSwipe && ul.currentY+move> minSwipe) {
            //使ul的y加上移动的距离，得到移动的距离
            ul.currentY += move;
            //移除ul对象的过渡动画行为
             jd.removeTransition(ul);
            //设置对象的变形行为,需要移动的距离
            //ul.style.transform = 'translateY(' + ul.currentY + 'px)';
            jd.setTransform(ul, ul.currentY, 'y');
        }
    });
    //监听手指离开后的事件
    ul.addEventListener('touchend', function(){
        //如果移动了
        if(ul.isMove){
            //如果移动后ul的y值大于最大定位距离，就让他等于最大距离
            if (ul.currentY>maxPosition){
                ul.currentY = maxPosition;
            }else if(ul.currentY < minPosition){//如果移动后ul的y值小于最小定位距离，就让他等于最小距离
                ul.currentY = minPosition;
            }
        }
        // 给对象添加过渡效果
        jd.addTransition(ul);
        // 设置对象的移动函数
        //ul.style.transform = 'translateY(' + ul.currentY + 'px)';
        jd.setTransform(ul, ul.currentY, 'y');
    });
}
// 事件
function addTipEvent(str){

    // 方式二
    jd.tip(document.querySelector(str), function(){
        var li = event.target.parentNode; // 触摸a标签
        var ul = li.parentNode;
        var lies = ul.children;
        for (var i=0;i<lies.length;i++){//遍历所有的li元素
            lies[i].className = '';
            lies[i].index = i;//得到此时是第几个li
        }
        li.className = 'now';//给li添加选中状态now

        // 点击li后移动到顶部
        // y值为菜单栏要向上移动的距离
        var y = -li.index * li.offsetHeight;
        var minPosition = ul.parentNode.offsetHeight - ul.offsetHeight;
        if (y < minPosition){
            y = minPosition;
        }
        ul.currentY = y;
        // 添加过渡
        jd.addTransition(ul);
        // 添加移动事件
        jd.setTransform(ul, y, 'y');
    });

    // 方式一
    /*var ul = document.querySelector(str);
    var children = ul.children;

    var minPosition = ul.parentNode.offsetHeight - ul.offsetHeight;
    // 给li添加上轻触事件
    for(var i=0;i<children.length;i++){
        (function(k){
            var that = children[k];
            jd.tip(that, function(){
                for (var j=0;j<children.length;j++){
                    children[j].className = '';
                    //children[j].style.borderRight = '1px solid #CCCCCC';
                }
                that.className = 'now';
                var y = -k*that.offsetHeight;
                if (y < minPosition) {
                    y = minPosition;
                }
                ul.style.transform = 'translateY(' + y + 'px)';
                jd.setTransform(ul, y, 'y');
                ul.currentY = y;
                jd.addTransition(ul);
                event.stopPropagation();    // 禁止把事件传递到ul的touchend
            });
        })(i);
    }*/
}

// 顶部返回上一页按键
function goBack() {
    // 获取按键
    var iconBack = document.querySelector('.icon_back');
    // 添加监听点击事件
    iconBack.addEventListener('click', function () {
        iconBack.setAttribute('href', 'javascript:;');
        // 负数往前，正数往后
        history.go(-1);
    });
}