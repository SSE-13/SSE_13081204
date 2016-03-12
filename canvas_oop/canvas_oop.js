var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, this.x, this.y);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
/*class Rect extends DisplayObject {

    width = 100

    height = 100;

    color = '#FF0000';

    render(context: CanvasRenderingContext2D) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    }
}*/
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.render = function (context) {
        context.font = this.size;
        context.fillStyle = this.color;
        context.fillText(this.word, this.x, this.y);
    };
    return TextField;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
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
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
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
text.size = '20px Arial';
text.color = '#FFFFFF';
text.word = '兵库北';
text.x = 60;
text.y = 270;
var text1 = new TextField();
text1.size = '35px Arial';
text1.color = '#FFFFFF';
text1.word = '花泽香菜';
text1.x = 35;
text1.y = 300;
var text2 = new TextField();
text2.size = '28px Arial';
text2.color = '#FFFFFF';
text2.word = '君は　私のMasterか';
text2.x = 180;
text2.y = 280;
var bitmap = new Bitmap();
bitmap.source = 'background.jpg';
bitmap.x = 0;
bitmap.y = 0;
var bitmap1 = new Bitmap();
bitmap1.source = 'bingkubei.png';
bitmap1.x = 115;
bitmap1.y = 5;
//渲染队列
var renderQueue = [bitmap, text, bitmap1, text1, text2];
//资源加载列表
var imageList = ['background.jpg', 'bingkubei.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
