
var humanContainer = new render.DisplayObjectContainer();
var body2 = new render.Bitmap();
var head = new render.Bitmap();
var rightharm = new render.Bitmap();
var leftharm = new render.Bitmap();
var rightleg = new render.Bitmap();
var leftleg = new render.Bitmap();


body2.source = "body.jpg";
head.source = "head.jpg";
rightharm.source = "right_harm.jpg";
leftharm.source = "left_harm.jpg";
rightleg.source = "right_leg.jpg";
leftleg.source = "left_leg.jpg";

humanContainer.addChild(head);
humanContainer.addChild(body2);
humanContainer.addChild(rightharm);
humanContainer.addChild(leftharm);
humanContainer.addChild(rightleg);
humanContainer.addChild(leftleg);

body2.x = 50;
body2.y = 130; 

head.x = 57;
head.y = 100;

rightharm.x=45;
rightharm.y=130;

leftharm.x = 90;
leftharm.y=132;

rightleg.x=50;
rightleg.y=210;

leftleg.x=80;
leftleg.y=210;

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["body.jpg","head.jpg","right_harm.jpg","left_harm.jpg","right_leg.jpg","left_leg.jpg"]);

class HumanBody extends Body {
    
    
    vx1:number = 1;
    vx2:number = this.vx1;
    
    vy1:number = 1;
    vy2:number = this.vy1;
    
    stay:boolean = false;
    
    rotate1:number = 0.5;
    rotate2:number = this.rotate1;
    
    
    onTicker(duringTime: number) {
        this.x += this.vx1*duringTime;
        this.y += this.vy1*duringTime;
        this.rotation +=this.rotate1;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);


var eventCore = new events.EventCore();
eventCore.init();

var headHitTest = (localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x>0&&localPoint.x<28&&localPoint.y>0&&localPoint.y<50){
    return true;
   }
}

var headOnClick = () => {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    if(body.stay==false){
    body.rotate1=-body.rotate2;
}
    else{

        body.rotate1=body.rotate2;
        body.vx1=body.vx2;
        body.vy1=body.vy2;
        body.stay=false;
    }
}

var leftlegHitTest=(localPoint:math.Point,displayObject:render.DisplayObject) =>{
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x>0&&localPoint.x<17&&localPoint.y>0&&localPoint.y<71){
        return true;
    }
}

var rightlegHitTest=(localPoint:math.Point,displayObject:render.DisplayObject) =>{
   //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x>-1&&localPoint.x<11&&localPoint.y>-1&&localPoint.y<71){
        return true;
    }
}

var leftlegOnClick = () =>{
    body.rotate1=0;
    body.vx1=0;
    body.vy1=0;
    body.stay=true;
}

var rightlegOnClick = () =>{
    body.rotate1=0;
    body.vx1=0;
    body.vy1=0;
    body.stay=true;
}

eventCore.register(head,headHitTest,headOnClick);
eventCore.register(leftleg,leftlegHitTest,leftlegOnClick);
eventCore.register(rightleg,rightlegHitTest,rightlegOnClick);










