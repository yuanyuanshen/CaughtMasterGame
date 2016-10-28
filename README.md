### 这是一个英雄抓怪物的小游戏

- 网上有各种说明以及源代码
- 自己模拟了一下，并进行部分优化
- 将英雄的移动范围设置在背景区域之内

### 部分代码

```javascript
var render = function () {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 0);
        }
        if (heroReady) {
            ctx.drawImage(heroImage, hero.x, hero.y);
        }
        if (monsterReady) {
            ctx.drawImage(monsterImage, monster.x, monster.y);
        }
        //计分
        ctx.fillStyle = "rgb(250,250,250)";
        ctx.font = "24px Helvetica";
        ctx.textAlign = "left";
        ctx.textBaseline = "top";
        ctx.fillText("Monsterrs caught: " + monstersCaught, 32, 32);
    };

var main = function () {
        var now = Date.now();
        var delta = now - then;

        update(delta / 1000);

        render();
        then = now;

        var w = window;
        requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
        // 立即调用主函数
        requestAnimationFrame(main);
    };
```
- 这段代码被执行很多次相当于render()函数被调用多次
- render()函数主要在canvas画布上画图片

### 问题

1. render()函数将被调用多次，多次执行ctx.drawImage()，相当于canvas上有几百张图片为什么不会造成资源浪费？
2. 每次根据移动位置不同，重新添加图片，requestAnimationFrame()函数是频率非常高么？为什么不会造成视觉上的影响？

