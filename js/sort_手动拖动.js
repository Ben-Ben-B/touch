
my_scroll();
/**
 * 1  手动拖动
 *      a touchstart
 *      b touchmove
 *      c 在移动的时候 要加上以前已经移动了的距离 
 * 2  弹簧效果
 * 3  点击菜单置顶
 */
function my_scroll(){
  // 目标元素
  var ul=document.querySelector(".left_menu");

  // 手指按下的y坐标
  var startY;

  // 已经移动了的距离
  var preDistance=0;

  ul.addEventListener("touchstart",function(e){
    // 判断手指的个数
    if(e.targetTouches.length>1){
      return;
    }
    // 记录坐标
    startY=e.targetTouches[0].clientY;
  });

  // 手指移动事件
  ul.addEventListener("touchmove",function(e){
    // 判断手指的个数
    if(e.targetTouches.length>1){
      return;
    }

    // 记录坐标
    var moveY=e.targetTouches[0].clientY;
    // 移动的距离 加上之前已经移动了的距离
    var distance=moveY-startY+preDistance;
    // 设置位移
    ul.style.transform="translateY("+distance+"px)";
  });

  // 手指松开
  ul.addEventListener("touchend",function(e){
    // 判断手指的个数
    if(e.changedTouches.length>1){
      return;
    }

    // 记录手指松开的坐标
    var endY=e.changedTouches[0].clientY;

    // 记录这一次移动了的距离 需要加上之前已经移动了的距离 所以是+=
    // 否则 第三次 拖动的时候 会出现bug
    preDistance+=endY-startY;
    // console.log(preDistance);
  });
}