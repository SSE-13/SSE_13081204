/**
 * 基类，负责处理x,y,rotation 等属性
 */ 
class DisplayObject {

    x = 0;

    y = 0;

    rotation = 0;
    

    draw(context: CanvasRenderingContext2D) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);

        context.restore();
    }

    render(context: CanvasRenderingContext2D) {

    }

}

class Bitmap extends DisplayObject {


    source;

    render(context: CanvasRenderingContext2D) {

        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, this.x,this.y);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    }

}

/*class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}*/
        
class TextField extends DisplayObject {
     size;
     color;
      word;
      
    render(context: CanvasRenderingContext2D) {
        
        context.font = this.size;
        context.fillStyle = this.color;
        context.fillText(this.word,this.x,this.y);
    }
}

function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject: DisplayObject = renderQueue[i];
        displayObject.draw(context);
    }
}

var imagePool = {};

function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function(imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;

        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        
        function onLoadError(){
            alert('资源加载失败:' + imageUrl);
        }
    })
}


var canvas: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;
var context = canvas.getContext("2d");


/*var rect = new Rect();
rect.width = 200;
rect.height = 100;
rect.color = '#00FF00'


var rect2 = new Rect();
rect2.width = 300;
rect2.height = 50;
rect2.x = 200;
rect2.y = 200;
rect2.rotation = Math.PI / 8;
rect2.color = '#00FFFF'*/


var text = new TextField();
text.size = '20px Arial'
text.color='#FFFFFF'
text.word = '兵库北'
text.x =60;
text.y= 270;

var text1 = new TextField();
text1.size = '35px Arial'
text1.color = '#FFFFFF'
text1.word = '花泽香菜'
text1.x = 35;
text1.y = 300;

var text2 = new TextField();
text2.size = '20px Arial'
text2.color = '#FFFFFF'
text2.word = 'Sevant Saber 召唤に従い 参上した 问う 贵方が私のマスタ-か'
text2.x = 150;
text2.y = 280;

var bitmap = new Bitmap();
bitmap.source = 'background.jpg';
bitmap.x=0;
bitmap.y=0;

var bitmap1 = new Bitmap();
bitmap1.source = 'bingkubei.png'
bitmap1.x = 115;
bitmap1.y = 5;

//渲染队列
var renderQueue = [bitmap,text,bitmap1,text1,text2];
//资源加载列表
var imageList = ['background.jpg','bingkubei.png'];

//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function() {
    drawQueue(renderQueue);
})


