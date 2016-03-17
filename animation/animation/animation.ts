/**
 * 重力加速度
 */
const GRAVITY = 9.8;

const BOUNDS_TOP = 0;

const BOUNDS_BOTTOM = 400;

const BOUNDS_LEFT = 0;

const BOUNDS_RIGHT = 400;

const BOUNCE = 0.95;

const μ=0.1;//摩擦系数
/**
 * 计时器系统
 */
class Ticker {

    bodyQueue = [];

    lastTime;

    /**
     * 启动计时器
     * @param bodyList 物理队列
     */
    start(bodyQueue) {
        this.bodyQueue = bodyQueue;
        this.lastTime = Date.now();
        var self = this;
        setInterval(this.onTicker.bind(this), 1000 / 60);
    }

    onTicker() {
        var currentTime = Date.now();
        var duringTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.bodyQueue.map(function(body) {
            body.onTicker(duringTime / 100)
        });
    }
}


class Body {

    vx = 0;
    vy = 0;
    x = 0;
    y = 0;
    width = 0;
    height = 0;
     a=2;//作为判断的值
    displayObject;

    constructor(displayObject: DisplayObject) {
        this.displayObject = displayObject;
    }

    public onTicker(duringTime) {
       
       
       if(this.a==2){
        this.vy += duringTime *GRAVITY;
        }
        if(this.a==1){
            this.vy=0;
            this.y=BOUNDS_BOTTOM-this.height;
            
        }
        
        this.x += duringTime * this.vx;
        this.y+=duringTime * this.vy;
        
        

         
        //上下反弹
        if (this.y + this.height >BOUNDS_BOTTOM && this.vy>0) {
            this.vy = -BOUNCE * this.vy; 
             if(this.vy>-1){    
                 this.a=1;
        }       
        }
        
        
   
       if (this.y < BOUNDS_TOP) {
            this.vy = -BOUNCE * this.vy;
           
        }
       
        //TODO： 左右越界反弹
        if(this.x + this.width > BOUNDS_RIGHT&& this.vx>0){
            this.vx = -BOUNCE * this.vx;
        }
        
        if(this.x < BOUNDS_LEFT&& this.vx<0){
            this.vx = -BOUNCE *this.vx;
        }
        
        //摩擦力
        if(this.vy==0&&this.y==BOUNDS_BOTTOM-this.height){
            if(this.vx>0){
            this.vx-=duringTime*μ*GRAVITY;
        }
            if(this.vx<0){
                this.vx+=duringTime*μ*GRAVITY;
            }
            if(this.vx<0.01&&this.vx>-0.01){
                this.vx=0;
            }
        }   
       
        
        

        //根据物体位置更新显示对象属性
        var displayObject = this.displayObject;
        displayObject.x = this.x;
        displayObject.y = this.y;

    }
}


var rect = new Rect();
rect.width = 150;
rect.height = 100;
rect.color = '#FF0000';

/**
 * 创建一个物体，其显示内容为一个长方形，受重力做平抛运动
 */
var body = new Body(rect);
body.width = rect.width;
body.height = rect.height;
body.vx = 10000;//需要保证 vx 在 0-50的范围内行为正常
body.vy = 0;//需要保证 vy 在 0-50的范围内行为正常


var renderCore = new RenderCore();
var ticker = new Ticker();

renderCore.start([rect]);
ticker.start([body]);


