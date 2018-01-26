window.onload = function () {

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