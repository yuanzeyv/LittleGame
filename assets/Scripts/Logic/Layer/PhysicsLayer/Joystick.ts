// import { EventTouch, find, Camera, Vec3, Vec2 ,Node} from "cc"; 
// export interface IJoystick{
//     JoystickSpeed(moveDir:Vec2,touchPercent:number):void;
// };

// export class Joystick{
//     private mPhysicsLayer:IJoystick;
//     private mTouchID:number = -1;//触屏ID，防止同时响应多个触摸事件，导致逻辑出错
//     private mTouchNode:Node;
//     private mJoystickBG:Node;
//     private mJoystick:Node; 
//     private mMoveLimit:number;
    
//     constructor(physicsLayer:IJoystick,touchNode:Node,joystickBG:Node,joystick:Node,moveLimit:number){
//         this.mTouchNode = touchNode;
//         this.mJoystickBG = joystickBG;
//         this.mJoystick = joystick;
//         this.mPhysicsLayer = physicsLayer;
//         this.mMoveLimit = moveLimit;
//         this.mTouchNode.on(Node.EventType.TOUCH_START,this.TouchStartHandle,this);
//         this.mTouchNode.on(Node.EventType.TOUCH_MOVE,this.TouchMoveHandle,this);
//         this.mTouchNode.on(Node.EventType.TOUCH_END,this.TouchEndHandle,this);
//         this.mTouchNode.on(Node.EventType.TOUCH_CANCEL,this.TouchEndHandle,this);
//     }
 
    
//     private TouchStartHandle(event:EventTouch){
//         event.preventSwallow = true;//允许向下穿透，
//         if( this.mTouchID != -1 ) return;//如果当前触摸ID  
//         this.mTouchID = event.getID();//当前的手指ID
//         this.mJoystickBG.active = true;
//         this.mJoystickBG.setWorldPosition(find("Canvas/Camera").getComponent(Camera).screenToWorld(new Vec3(event.getLocationX(),event.getLocationY(),0)));
//     } 

//     private TouchMoveHandle(event:EventTouch){
//         event.preventSwallow = true;
//         if( event.getID() !=  this.mTouchID ) return; //如果当前触摸ID
//         let startPos:Vec2 = event.getStartLocation();  
//         let nowPos:Vec2 = event.getLocation();
//         let offsetPos:Vec2 = nowPos.subtract(startPos);//当前坐标的偏移向量
//         let nowLen:number = offsetPos.length();//获取到偏移长度
//         if(nowLen > this.mMoveLimit){
//             let factor:number = this.mMoveLimit / nowLen;
//             offsetPos.x *= factor;
//             offsetPos.y *= factor; 
//             nowLen = this.mMoveLimit;  
//         }
//         this.mJoystick.setPosition(offsetPos.x,offsetPos.y);//设置偏移坐标
//         this.mPhysicsLayer.JoystickSpeed(offsetPos.normalize(),nowLen / this.mMoveLimit);
//     } 
     
//     private TouchEndHandle(event:EventTouch){  
//         event.preventSwallow = true;
//         if(event.getID() !=  this.mTouchID ) return;//如果当前触摸ID 
//         this.mTouchID = -1;
//         this.mJoystickBG.active = false;
//         this.mJoystick.setPosition(0,0);
//         this.mPhysicsLayer.JoystickSpeed(new Vec2(0,0),1);
//     } 
// };  