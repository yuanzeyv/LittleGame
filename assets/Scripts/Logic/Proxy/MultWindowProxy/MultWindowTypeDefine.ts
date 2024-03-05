import { eNotice } from "../../../NotificationTable"; 

export type MultWindowParam = {id:number,openNotice:eNotice,closeNotice:eNotice,addNotice?:eNotice,MainMediator?:string};
export let MultWindowParamMap:{[id:number]:MultWindowParam} ={
    1         :{id:1,openNotice:eNotice.OpenMultBagLayer,closeNotice:eNotice.ClosMultBagLayer,addNotice:eNotice.AddMultBagLayer ,MainMediator:"BagMultMediator"},//隐私协议面板
    2         :{id:2,openNotice:eNotice.OpenBagLayer,closeNotice:eNotice.CloseBagLayer},//隐私协议面板
}; 