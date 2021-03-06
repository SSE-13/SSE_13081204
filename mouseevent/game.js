var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
rightharm.x = 45;
rightharm.y = 130;
leftharm.x = 90;
leftharm.y = 132;
rightleg.x = 50;
rightleg.y = 210;
leftleg.x = 80;
leftleg.y = 210;
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["body.jpg", "head.jpg", "right_harm.jpg", "left_harm.jpg", "right_leg.jpg", "left_leg.jpg"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx1 = 1;
        this.vx2 = this.vx1;
        this.vy1 = 1;
        this.vy2 = this.vy1;
        this.stay = false;
        this.rotate1 = 0.5;
        this.rotate2 = this.rotate1;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x += this.vx1 * duringTime;
        this.y += this.vy1 * duringTime;
        this.rotation += this.rotate1;
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
ticker.start([body]);
var eventCore = new events.EventCore();
eventCore.init();
var headHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x > 0 && localPoint.x < 28 && localPoint.y > 0 && localPoint.y < 50) {
        return true;
    }
};
var headOnClick = function () {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    if (body.stay == false) {
        body.rotate1 = -body.rotate2;
    }
    else {
        body.rotate1 = body.rotate2;
        body.vx1 = body.vx2;
        body.vy1 = body.vy2;
        body.stay = false;
    }
};
var leftlegHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x > 0 && localPoint.x < 17 && localPoint.y > 0 && localPoint.y < 71) {
        return true;
    }
};
var rightlegHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x > -1 && localPoint.x < 11 && localPoint.y > -1 && localPoint.y < 71) {
        return true;
    }
};
var leftlegOnClick = function () {
    body.rotate1 = 0;
    body.vx1 = 0;
    body.vy1 = 0;
    body.stay = true;
};
var rightlegOnClick = function () {
    body.rotate1 = 0;
    body.vx1 = 0;
    body.vy1 = 0;
    body.stay = true;
};
eventCore.register(head, headHitTest, headOnClick);
eventCore.register(leftleg, leftlegHitTest, leftlegOnClick);
eventCore.register(rightleg, rightlegHitTest, rightlegOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ3pELElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2hDLElBQUksSUFBSSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQy9CLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBR2xDLEtBQUssQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDO0FBQ3pCLFNBQVMsQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUM7QUFDcEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFDbEMsUUFBUSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUM7QUFDbEMsT0FBTyxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7QUFFaEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQy9CLGNBQWMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNsQyxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2xDLGNBQWMsQ0FBQyxRQUFRLENB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