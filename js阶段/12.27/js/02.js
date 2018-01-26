document.getElementsByClassName=
    document.getElementsByClassName ?
        document.getElementsByClassName : getByClassName;

function getByClassName(className){
    var result = [];

    var allEle =  document.getElementsByTagName('*');
    for (var i = 0;i<allEle.length;i++){
        var el = allEle[i];
        if(el.className && hasClass(allEle[i],className)){
            result.push(el);
        }
    }
    return result;
}
function hasClass (el,className) {
    var arr = el.className.split(' ');
    for(var i=0;i<arr.length;i++){
        if(arr[i] == className){
            return true;
        }
    }
    return false;
}

// 添加新的类选择器
function addClass(el,className) {
    if(!hasClass(el,className)){
        //1.
        el.className = el.className + ' ' + className;
        //2.
        // var arr = el.className.split(' ');
        // arr.push(className);
        // el.className = arr.join(' ');
    }
}

//删除标签指定的类名
function removeClass(el,className) {
    var arr = el.className.split(' ');
    var pos = -1;//保存classname出现在标签class中的位置
    for(var i=0;i<arr.length;i++){
        if(arr[i]==className){
            pos=i;
            break;
        }
    }
    if(pos == -1){
        return;
    }
    else if(pos==0){
        arr.shift();

    }else if(pos = arr.length-1){
        arr.pop();
    }else {
        var arr1 = arr.slice(0,pos);
        var arr2 = arr.slice(pos+1);
        arr = arr1.concat(arr2);
    }
    el.className = arr.join(' ');
}