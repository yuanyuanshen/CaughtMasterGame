/**
 * Created by niuhui on 2016/10/27.
 */

window.onload = function () {

    var canvas = document.createElement("canvas");//创建画布
    var ctx = canvas.getContext("2d");//创建画笔
    canvas.width = 512;
    canvas.height = 480;
    document.body.appendChild(canvas);

    //创建图片
    var bgReady = false;
    var bgImage = new Image();
    var heroReady = false;
    var heroImage = new Image();
    var monsterReady = false;
    var monsterImage = new Image();

    //创建游戏对象
    var hero = {
        speed: 256, //每秒移动的像素
        x: 0,
        y: 0
    };
    var monster = {
        x: 0,
        y: 0
    };
    var monstersCaught = 0;

    //用户输入
    var keysDown = {};

    //设置背景图片
    bgImage.onload = function () {
        bgReady = true;
    };
    heroImage.onload = function () {
        heroReady = true;
    };
    monsterImage.onload = function () {
        monsterReady = true;
    };
    bgImage.src = "images/background.png";
    heroImage.src = "images/hero.png";
    monsterImage.src = "images/monster.png";

    //处理用户的输入
    addEventListener("keydown", function (e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function (e) {
        delete keysDown[e.keyCode];
    }, false);

    //当用户抓住一只怪物之后开启新一轮游戏
    var reset = function () {
        hero.x = canvas.width / 2;
        hero.y = canvas.height / 2;

        //将怪物随机放到界面上
        monster.x = 32 + (Math.random() * (canvas.width - 64));
        monster.y = 32 + (Math.random() * (canvas.height - 64));
    }

    //更新游戏对象的属性
    var update = function (modifier) {
        if (38 in keysDown) {//用户按的↑
            hero.y = (hero.y - hero.speed * modifier) < 32 ? 32 : (hero.y - hero.speed * modifier);
        }
        if (40 in keysDown) {//用户按的↓
            hero.y = (hero.y + hero.speed * modifier) > 416 ? 416 : (hero.y + hero.speed * modifier);
        }
        if (37 in keysDown) {//用户按的←
            hero.x = (hero.x - hero.speed * modifier) < 32 ? 32 : (hero.x - hero.speed * modifier);
        }
        if (39 in keysDown) {//用户按的→
            hero.x = (hero.x + hero.speed * modifier) > 448 ? 448 : (hero.x + hero.speed * modifier);
        }

        //英雄碰到怪物了么？
        if (
            hero.x <= (monster.x + 32)
            && monster.x <= (hero.x + 32)
            && hero.y <= (monster.y + 32)
            && monster.y <= (hero.y + 32)
        ) {
            ++monstersCaught;
            reset();
        }
    };

    //画出所有物体
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

    var then = Date.now();
    reset();
    main();

}