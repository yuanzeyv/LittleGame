# 程序文件夹结构：

## 1:场景存放目录
 存放在Assets目录下的Scene文件夹之下。目前游戏逻辑相对简单，单场景足够游戏使用，不需要切换场景。
## 2:资源存放目录（所有与资源相关连的，后期都可以使用Bundle来远程加载减少包体大小，避免因包体过大，不符合某些平台的要求，而导致无法上传。）
### 1:图片路径
#### 1:Assets/resources/public路径下。
	主要用于针对通用的或常用的文件进行统一存放，减少包体大小，提升系统性能。
#### 2:Assets/resources/Images/private路径下
	针对各个界面，所需要的独立的图片，放入到此路径下，尽量保证此路径的图片是独一无二的，如果和其他界面有重复的图片,可以考虑把重复的图片放入public之中。
### 2:材质路径
	目前游戏不需要使用 Shader 特效，暂时不需要此功能，后期可以根据游戏具体业务，来编写。
### 3:预制体路径
	这个框架主要是针对2D游戏的,暂未考虑加入3D游戏一些模型等预制体。只考虑了与界面相关的预制体，譬如界面，界面中组件等。
### 4:音频存放路径
	直接放置在Assets/resources/Sound目录下即可。
### 5:配置文件存放路径
	Assets/resources/Configs,在外部通过配置xls表的形式，将表转换为Json的格式导入目录下，可以直接再程序代码中读取加载配置，读取到游戏内存中。

## 3:脚本存放目录 
### Assets/Scripts目录说明
1: Componment 中包含了一个窗口最基本的组件信息。
2:Config 中包含了，程序自己的一些数据及参数配置。
3:Frame 中包含了项目的基础框架逻辑(出发出现bug，不然此部分，不需要修改)。
4:Logic 目录用于存放游戏的主逻辑功能
5:Util 目录，用于存放各种工具类（如果要添加新功能，尽量不要冗余在一起，一个功能一个文件分开，以避免过度耦合）。

# 程序框架结构：
游戏中使用MVC框架作为基础框架，框架的主要实现是Assets/Scripts/Frame/PureMVC.ts文件实现。其他的文件都是在PureMVC之上的一个封装。
## BaseControl:
主要逻辑就是，程序通过通知者模式，传递数据给新建的Command. 他会对消息进行一次解包，将所有数据信息分开传给其他函数。
## BaseMediator:
原来的Mediator的注册和监听，会造成程序的代码冗余，这里直接使用Map将对应的监听消息 与 监听回调进行保存，放在频繁重写代码造成代码冗余，与减少编程过程中的低级错误。 
## WindowMediator:
后来的想法是，BaseMediator专注于处理消息传递。 
新写一个WindowMediator专注与处理界面逻辑，大体逻辑就是，当用户需要编写一个待显示的界面时，应继承此Mediator。
## BaseLayer:
其本身是一个Compnent组件
拥有一个与BaseMediator功能类似的监听Map,用于监听并执行由WindowMediator发送消息。
并且会有一些功能方法，同意Layer的编写规范。
## BaseProxy:
在原有的基础上，新加了一个onLoad方法，这个方法会在所有Proxy都加载完后，同意运行，可以更加方便的获取代理间的指针引用。
## BaseMVCRegister:
用于继承所有的Meidator Command Proxy的注册的类。 可以注册这个类（Scripts/Config/GameMVCConfig中就有注册），并重写Alloc* * * 函数，来传递想要注册的类。

# 框架使用说明：

使用框架前，需要知道为什么本代码要考虑使用MVC做框架。 让代码变的更内聚，逻辑更可读。

Proxy:对应着数据逻辑，程序中所有与数据相关的逻辑，请全部放在Proxy中，如果界面中需要读取数据，譬如关卡数据，直接在Layer中获取Proxy的对象后，直接调用方法获取。

Mediator:主要负责消息对界面的数据中转，即使监听到对应注册的消息后，将消息转发至相对应的Layer下。

Command:单一的逻辑的时候，调用不频繁的时候，可以使用Command来做消息的数据处理。

Layer:游戏的界面，便是在这里呈现的，在里面加入对应的CocosApi，让界面 功能更加丰富。



# 功能编写说明:

基础功能已经添加完毕了，现在可以直接进行界面开发。 流程如下：

示例:(如果此时我想加入一个Test界面)

## Proxy：

1:在Logic/Proxy目录下新建一个TestProxy文件夹，并新加入一个TestProxy.ts文件。

2:创建一个TestProxy类其继承自BaseProxy.

3:加入本行（返回的字符串应该与类名一致）

```ts
static get ProxyName():string {return "TestProxy";}
```

4:加入我需要的数据

```
private m_MyData:string = "这是一个简单的测试数据";
public getMyData():string { return this.m_MyData;} 
```

5:将TestProxy注册到Scripts/Config/GameConfig/GameMVCRegister.ts文件夹下的AllocProxy中。

```
protected AllocProxy(proxyMap: Set<ProxyConstructor>): void {
      proxyMap
      .add(TestProxy)
...
```

这一步的目的是注册，并使当前Proxy可查.

## Prefab:

1:在resources/Perfab下新建一个TestLayer文件夹，

2:在新建的文件夹下,创建一个名为TestLayer的预制体，其上拥有一个名为BackButton的按钮控件，以及用于显示TestProxy数据的Label组件。

3:将Scripte/Logic/Layer/TestLayer/TestLayer.ts拖入到预制体组件的根节点下。（TestLayer必须继承自BaseLayer。）

## Layer:

1:在Logic/Mediator目录下新建一个TestLayer文件夹，并新加入一个TestLayer.ts文件。

2:在其中编写Cocos代码逻辑:

```
import { _decorator, Component, Node, BlockInputEvents, Color, Sprite, Button, Label, find, tween, PageView, Vec2, UITransform, Size, Prefab, instantiate } from 'cc'; 
import { BaseLayer, LayerExecute } from '../../../Frame/BaseLayer/BaseLayer';
import { _Facade } from '../../../Global';
import { NotificationEnum } from '../../../NotificationTable';
import { TestMediator } from '../../Mediator/TestMediator/TestMediator';
import { TestProxy } from '../../Proxy/TestProxy/TestProxy';
const { ccclass, property,type} = _decorator; 
@ccclass('SelectPassLayer')
export class SelectPassLayer extends BaseLayer { //一个界面必须继承BaseLayer类
    @property({type:Button,displayName:"返回按钮"})
    private m_BackButton:Button;
    @property({type:Label,displayName:"数据信息"})
    private m_Label:Label;
    InitNode():void{ 
        this.m_BackButton = find("BackButton",this.node).getComponent(Button);
        this.m_Label = find("Label",this.node).getComponent(Label);
    }
     
    InitData():void{
        this.m_BackButton.node.on("click",this.BackButtonHandle.bind(this));
    } 

    InitLayer():void{ 
        let testProxy:TestProxy = _Facade.FindProxy(TestProxy);//获取到测试代理
        this.m_Label.string = testProxy.getMyData();
    }
    BackButtonHandle(){
	    //发送CloseWindow 关闭当前界面
        _Facade.Send(NotificationEnum.CloseWindow,TestMediator.MediatorName);
    } 
}
```

（注:虽然cocos提供了Property描述符，但是尽量不要使用拖动的方式来获取组件，因为拖动的方式，在多人开发的项目中，很容易引起冲突，增加开发时间。）

3:将组件拖动到resources/Perfab/TestLayer/TestLayer.prefab预制体的根节点下。

## Mediator:

1:在Logic/Mediator目录下新建一个TestMediator文件夹，并新加入一个TestMediator.ts文件。

2:创建一个TestMediator类其继承自WindowBaseMediator.(因为他将会监听一个界面)

3:在Scripts/NotificationTable中添加打开界面的通知。

```
//Scripts/NotificationTable
export enum NotificationEnum {
    TestOpen = "TestOpen",
```

4:在testMediator中监听这个消息，并且设置回调*

```
 RegisterNotification(notificationMap:Map<string,NotificationHandle>):void{
        notificationMap
        .set(NotificationEnum.TestOpen,this.TestOpenHandle.bind(this))   
    }  
```

5：重写窗口预制体存放路径的函数 InitPrefabPath

```
 protected InitPrefabPath(): string {//每个窗口mediator都对应一个窗口预制体
        return "Perfab/LoginLayer/LoginLayer";
 }
```

6：在TestOpenHandle中，加入窗口创建的逻辑代码。

```

    TestOpenHandle(data:any){  
        if(this.ExistWindow) return;//存在的话直接进行返回
        let windowRequest:WindowCreateRequest = new WindowCreateRequest(this,data,LayerOrder.MinBottom);//创建一个window请求
        windowRequest.SetFullScreenMask(true,true,new Color(0,128,25,255));//设置窗口未加载完成时的背景颜色
        windowRequest.SetWindowTouchMask(true);//设置窗口是由拥有触摸屏蔽组件
        _Facade.Send(NotificationEnum.CreateWindow,windowRequest);//发送一个创建window请求
    }  
```

7:将TestMediator注册到Scripts/Config/GameConfig/GameMVCRegister.ts文件夹下的AllocMediator中。

```
 protected AllocMediator(mediatorMap: Set<MediatorConstructor>): void {
      mediatorMap
      .add(TestMediator) //测试用界面
```

## 最后:

在程序的某个界面下，对一个按钮回调中加入发送     消息即可打开Test窗口界面了。

```
_Facade.Send(NotificationEnum.TestOpen);//打开测试界面
```

如果不知道加哪儿，可以全局路径搜索 TestOpen，查询我加的位置，将注释放开即可。
