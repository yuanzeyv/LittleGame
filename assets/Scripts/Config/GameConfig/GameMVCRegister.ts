import { BaseMVCRegister, CommandConstructor, MediatorConstructor,ProxyConstructor} from "../../Frame/MVCRegister/BaseMVCRegister";
import { AuthSuccessCommand } from "../../Logic/Control/AuthSuccessCommand";
import { AnnouncementMediator } from "../../Logic/Mediator/AnnouncementMediator/AnnouncementMediator";
import { AudioMediator } from "../../Logic/Mediator/AudioMediator.ts/AudioMediator.ts";
import { BagMeidator } from "../../Logic/Mediator/BagMediator/BagMediator";
import { ChangeNameMediator } from "../../Logic/Mediator/ChangeNameMediator/ChangeNameMediator";
import { FightMediator } from "../../Logic/Mediator/FightMediator/FightMediator";
import { GameBoxMediator } from "../../Logic/Mediator/GameBoxMediator/GameBoxMediator";
import { LogInMeidator } from "../../Logic/Mediator/LogInMediator/LogInMeidator";
import { MainMenuMediator } from "../../Logic/Mediator/MainMenuMediator/MainMenuMediator";
import { PlayerMediator } from "../../Logic/Mediator/PlayerMediator/PlayerMediator";
import { TipsMediator } from "../../Logic/Mediator/TipsMediator/TipsMediator";
import { UserBaseMediator } from "../../Logic/Mediator/UserBaseMediator/UserBaseMediator";
import { WindowMediator } from "../../Logic/Mediator/WindowMediator/WindowMediator";
import { WorldMediator } from "../../Logic/Mediator/WorldMediator/WorldMediator";
import { AudioProxy } from "../../Logic/Proxy/AudioProxy/AudioProxy";
import { NetDispatchProxy } from "../../Logic/Proxy/NetDispatchProxy/NetDispatchProxy";
import { NetProxy } from "../../Logic/Proxy/NetProxy/NetProxy";
import { UserProxy } from "../../Logic/Proxy/UserProxy/UserProxy";
import { WindowProxy } from "../../Logic/Proxy/WindowProxy/WindowProxy";
import { NotificationEnum } from "../../NotificationTable";

 export class GameMVCRegister extends BaseMVCRegister{    
    protected AllocCommand(commandMap: Map<NotificationEnum, CommandConstructor>): void {
      commandMap
       .set(NotificationEnum.NetAuthSuccess,AuthSuccessCommand);
    }
  
    protected AllocMediator(mediatorMap: Set<MediatorConstructor>): void {
      mediatorMap
      .add(WindowMediator)//????????????mediator
      .add(GameBoxMediator)//????????????mediator
      .add(LogInMeidator)//???????????????mediator
      .add(TipsMediator)//????????????mediator
      .add(AudioMediator)//?????????
      .add(AnnouncementMediator) //?????????
      .add(UserBaseMediator) //???????????????
      .add(ChangeNameMediator) //???????????????
      .add(MainMenuMediator)//?????????+
      .add(BagMeidator)//????????????
      .add(FightMediator)//???????????????
      .add(WorldMediator)//????????????
      .add(PlayerMediator)//????????????
      
    }  
     
    protected AllocProxy(proxyMap: Set<ProxyConstructor>): void {
      proxyMap
      .add(NetProxy)
      .add(NetDispatchProxy)
      .add(WindowProxy)
      .add(AudioProxy)
      .add(UserProxy)
    }
     
 }  