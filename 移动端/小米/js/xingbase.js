window.onload = function () {
    slider();
    searchBar();
};
function searchBar(){
    // 1. 获取jd_header_box
    var headerBox = document.querySelector('.mi-header');
    var aa = document.getElementsByClassName('icon-icon-test')[0];
    var bb =document.getElementsByClassName('icon-saoma')[0];
    var cc = document.getElementsByClassName('mi-nav-ul')[0];

    var oA=cc.getElementsByTagName('a');
    // 2. 获取jd_banner
    var banner = document.querySelector('.color_banner');
    // 3. 获取jd_banner的高度
    var height = banner.offsetHeight;
    console.log(height);
    var opacity= 0;
    // 4. 绑定window的滚动事件
    window.onscroll = function() {
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 5. 判断scrollTop是否小于jd_banner的高度
        if(scrollTop < height) {
            // 6. 变成橙色
            opacity = 1;
            headerBox.style.background = 'rgba(224, 50, 26,' + opacity + ')';
            aa.style.color='white';
            bb.style.color='white';

            for (var i=0;i<oA.length;i++){

               oA[i].style.color='white';
            }

        } else {
            // 7. 变白色
            opacity = 1;
            headerBox.style.background = 'rgba(240, 240, 240, ' + opacity + ')';
            aa.style.color='gray';
            bb.style.color='gray';

            for (var i=0;i<oA.length;i++){

                oA[i].style.color='gray';
            }
        }

    }
}

function slider() {
    /*
    1. 自动轮播(定时器 过渡)
    2. 小圆点随着图片滚动
    3. 图片可以滑动
    4. 滑动不超过一定距离 吸附回去
    5. 超过一定距离 滚动到下一张
     */

    // 获取事件相关的元素
    var banner = document.querySelector('.xm_banner');
    var imgUl = banner.children[0];
    var dotUl = banner.children[1];
    var width = banner.offsetWidth;
    var current = 1;
    banner.timeInterval = 2000; // 定时器播放的时间间隔

    // 轮播
    clearInterval(banner.timer);
    banner.timer = setInterval(function(){
        current++;
        // 设定过渡
        // imgUl.style.transition = 'all 0.5s';
        // imgUl.style.webkitTransition = 'all 0.5s';
        xm.addTransition(imgUl);
        // 设置移动的距离
        var dis = -current * width;
        // 设置transform
        // imgUl.style.transform = 'translateX(' + dis + 'px)';
        // imgUl.style.webkitTransform = 'translateX(' + dis + 'px)';
        xm.setTransform(imgUl, dis, 'x');
    }, banner.timeInterval);

   xm.addTransitionEnd(imgUl, function(){
        if (current>imgUl.children.length-2){
            current = 1;
        }else if (current == 0){
            current = imgUl.children.length - 2;
        }
        xm.removeTransition(imgUl);
        xm.setTransform(imgUl, -current*width, 'x');
        updateDot();
    });
    // 小圆点随着图片滚动
    function updateDot(){
        for (var i=0;i<dotUl.children.length;i++){
            dotUl.children[i].className = '';
        }
        dotUl.children[current - 1].className = 'active';
    }
    // 图片可以滑动
    imgUl.addEventListener('touchstart', function(e){
        // 停止轮播
        clearInterval(banner.timer);
        imgUl.startX = e.touches[0].pageX;
    });
    imgUl.addEventListener('touchmove', function(e){
        // 记录手指是否有移动
        imgUl.isMove = true;
        imgUl.endX = e.touches[0].pageX;
        // 手指移动的距离
        imgUl.distance = imgUl.endX - imgUl.startX;
        xm.removeTransition(imgUl);
        xm.setTransform(imgUl, -current*width+imgUl.distance, 'x');
    });
    imgUl.addEventListener('touchend', function(){
        if (imgUl.isMove){
            // 判断是往下一张图片，还是恢复当前的图片
            if (Math.abs(imgUl.distance) > width/3){// 播放下一张
                if(imgUl.distance > 0){
                    current--;
                }else{
                    current++;
                }
                xm.addTransition(imgUl);
                xm.setTransform(imgUl, -current*width, 'x');
            }else{ // 恢复当前位置的图片
                xm.addTransition(imgUl);
                xm.setTransform(imgUl, -current*width, 'x');
            }
        }
        clearInterval(banner.timer);
        banner.timer = setInterval(function(){
            current++;
            xm.addTransition(imgUl);
            xm.setTransform(imgUl, -current*width, 'x');
        }, banner.timeInterval);
    });
}