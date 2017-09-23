my_scroll()

function my_scroll() {
    var ul = document.querySelector(".left_menu")
        // 按下坐标
    var startY;
    var preDistance = 0;
    //设置弹簧
    var springs = 50;
    //设置拉升的最大距离
    var maxUp = -(ul.offsetHeight - ul.parentNode.offsetHeight)
    ul.addEventListener("touchstart", function(e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        startY = e.targetTouches[0].clientY;
        ul.style.transition = "none";
    })
    ul.addEventListener("touchmove", function(e) {
        if (e.targetTouches.length > 1) {
            return;
        }
        var moveY = e.targetTouches[0].clientY;
        var distance = moveY - startY + preDistance;
        if (distance > springs) {
            distance = springs;
        } else if (distance < maxUp - springs) {
            distance = maxUp - springs;
        }
        ul.style.transform = "translateY(" + distance + "px)";
    })
    ul.addEventListener("touchend", function(e) {
        if (e.changedTouches.length > 1) {
            return
        }
        var endY = e.changedTouches[0].clientY;
        preDistance += endY - startY;
        if (preDistance > 0) {
            preDistance = 0;
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateY(" + preDistance + "px)";
        } else if (preDistance < maxUp) {
            preDistance = maxUp;
            ul.style.transition = "transform .5s";
            ul.style.transform = "translateY(" + preDistance + "px)";
        }
    })
    itcast(ul).tap(function(e) {
        var targetLi = e.target;
        if (targetLi.nodeName === "A") {
            targetLi = targetLi.parentNode;
        }
        var lis = document.querySelectorAll("ul>li");
        var index = 0;
        for (var i = 0; i < lis.length; i++) {
            lis[i].classList.remove("active");
            if (lis[i] == targetLi) {
                index = i;
                lis[i].classList.add("active");
            }
        }
        var totalUp = -(index * targetLi.offsetHeight);
        if (totalUp < maxUp) {
            totalUp = maxUp;
        }
        preDistance = totalUp;
        ul.style.transition = "transform .5s";
        ul.style.transform = "translateY(" + preDistance + "px)";
    })
}