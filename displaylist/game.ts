module game {


}

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
body2.y = 30; 

head.x = 57;
head.y = 0;

rightharm.x=45;
rightharm.y=30;

leftharm.x = 90;
leftharm.y=32;

rightleg.x=50;
rightleg.y=110;

leftleg.x=80;
leftleg.y=110;
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["body.jpg","head.jpg","right_harm.jpg","left_harm.jpg","right_leg.jpg","left_leg.jpg"]);


class HumanBody extends Body {


    onTicker(duringTime: number) {

        this.x = this.vx*duringTime;
        this.y = this.vy*duringTime;
        this.rotation =Math.PI*duringTime;

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);











