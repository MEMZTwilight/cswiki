window.onload = function () {
    
    console.log("我靠你妈\n\n");
    console.log("大厨Esports");
    console.log("看密码.");
    console.log("厨子制作", bg);
}
let bg = 'background: #de4f56; color: #fff; border-radius: 2px;background-size:10px';
var canvas = document.getElementById("canvas"); var ctx = canvas.getContext("2d"); var cw = canvas.width = window.innerWidth, cx = cw / 2; var ch = canvas.height = window.innerHeight, cy = ch / 2; ctx.fillStyle = "#000"; var linesNum = 16; var linesRy = []; var requestId = null; function Line(flag) {
    this.flag = flag; this.a = {}; this.b = {}; if (flag == "v") { this.a.y = 0; this.b.y = ch; this.a.x = randomIntFromInterval(0, ch); this.b.x = randomIntFromInterval(0, ch); } else if (flag == "h") { this.a.x = 0; this.b.x = cw; this.a.y = randomIntFromInterval(0, cw); this.b.y = randomIntFromInterval(0, cw); }
    this.va = randomIntFromInterval(25, 100) / 100; this.vb = randomIntFromInterval(25, 100) / 100; this.draw = function () { ctx.strokeStyle = "#ccc"; ctx.beginPath(); ctx.moveTo(this.a.x, this.a.y); ctx.lineTo(this.b.x, this.b.y); ctx.stroke(); }
    this.update = function () {
        if (this.flag == "v") { this.a.x += this.va; this.b.x += this.vb; } else if (flag == "h") { this.a.y += this.va; this.b.y += this.vb; }
        this.edges();
    }
    this.edges = function () {
        if (this.flag == "v") {
            if (this.a.x < 0 || this.a.x > cw) { this.va *= -1; }
            if (this.b.x < 0 || this.b.x > cw) { this.vb *= -1; }
        } else if (flag == "h") {
            if (this.a.y < 0 || this.a.y > ch) { this.va *= -1; }
            if (this.b.y < 0 || this.b.y > ch) { this.vb *= -1; }
        }
    }
}
for (var i = 0; i < linesNum; i++) { var flag = i % 2 == 0 ? "h" : "v"; var l = new Line(flag); linesRy.push(l); }
function Draw() {
    requestId = window.requestAnimationFrame(Draw); ctx.clearRect(0, 0, cw, ch); for (var i = 0; i < linesRy.length; i++) { var l = linesRy[i]; l.draw(); l.update(); }
    for (var i = 0; i < linesRy.length; i++) {
        var l = linesRy[i]; for (var j = i + 1; j < linesRy.length; j++) {
            var l1 = linesRy[j]
            Intersect2lines(l, l1);
        }
    }
}
function Init() {
    linesRy.length = 0; for (var i = 0; i < linesNum; i++) { var flag = i % 2 == 0 ? "h" : "v"; var l = new Line(flag); linesRy.push(l); }
    if (requestId) { window.cancelAnimationFrame(requestId); requestId = null; }
    cw = canvas.width = window.innerWidth, cx = cw / 2; ch = canvas.height = window.innerHeight, cy = ch / 2; Draw();
}; setTimeout(function () { Init(); addEventListener('resize', Init, false); }, 15); function Intersect2lines(l1, l2) {
    var p1 = l1.a, p2 = l1.b, p3 = l2.a, p4 = l2.b; var denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y); var ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator; var ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator; var x = p1.x + ua * (p2.x - p1.x); var y = p1.y + ua * (p2.y - p1.y); if (ua > 0 && ub > 0) {
        markPoint({
            x: x, y: y
        })
    }
}

function markPoint(p) { ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI); ctx.fill(); }
function randomIntFromInterval(mn, mx) { return ~~(Math.random() * (mx - mn + 1) + mn); }


// 添加 Swiper 初始化代码
$(document).ready(function () {
    new WOW().init();

    const swiper = new Swiper('.swiper', {
        direction: 'vertical',
        slidesPerView: 'auto',
        autoHeight: true,
        
        touchRatio: 1,
        resistance: true,
        resistanceRatio: 0.85,
        
        mousewheel: {
            sensitivity: 1,
            releaseOnEdges: true
        },
        
        speed: 800,
        effect: 'slide',
        
        hashNavigation: {
            watchState: true,
        },
        
        // 事件处理
        on: {
            init: function() {
                this.allowTouchMove = true;
            },
            touchStart: function() {
                this.allowTouchMove = true;
            },
            slideChangeTransitionStart: function() {
                // 重置所有动画状态
                const animations = document.querySelectorAll('.wow');
                animations.forEach(el => {
                    el.classList.remove('animated');
                    el.classList.remove('animate__fadeInUp');
                    el.classList.remove('animate__animated');
                    el.style.visibility = 'hidden';
                });
            },
            slideChangeTransitionEnd: function() {
                // 触发新页面的动画
                const currentSlide = this.slides[this.activeIndex];
                const animations = currentSlide.querySelectorAll('.wow');
                animations.forEach(el => {
                    el.style.visibility = 'visible';

                    el.classList.add('animate__animated');
                    el.classList.add('animate__fadeInUp');
                });
                
                // 更新 Swiper 状态
                this.update();
                this.allowTouchMove = true;
            }
        }
    });

    
    // 点击导航菜单切换到对应页面
    $('#menu li').click(function () {
        const index = $(this).index();
        swiper.slideTo(index - 1);
    });
});
