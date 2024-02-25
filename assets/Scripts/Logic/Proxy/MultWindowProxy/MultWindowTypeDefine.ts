import { eNotice } from "../../../NotificationTable";

export type MultWindowParam = {id:number,openNotice:eNotice,closeNotice:eNotice};
export let MultWindowParamMap:{[id:string]:MultWindowParam} ={
    //隐私协议面板
    PrivacyAgreement    :{id:2,openNotice:eNotice.AddWindowNode,closeNotice:eNotice.AddWindowNode},//隐私协议面板
    AgeProtection       :{id:2,openNotice:eNotice.AddWindowNode,closeNotice:eNotice.AddWindowNode},//年龄面板
    GameAgreement       :{id:2,openNotice:eNotice.AddWindowNode,closeNotice:eNotice.AddWindowNode},//游戏协议面板
    GameNotice          :{id:2,openNotice:eNotice.AddWindowNode,closeNotice:eNotice.AddWindowNode},//游戏公告面板
    AntiAddictionNotice :{id:2,openNotice:eNotice.AddWindowNode,closeNotice:eNotice.AddWindowNode},//防沉迷公告面板
};