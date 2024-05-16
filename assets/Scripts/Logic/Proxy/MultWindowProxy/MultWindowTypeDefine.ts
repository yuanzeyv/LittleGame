import { eNotice } from "../../../NotificationTable"; 

export type MultWindowParam = {id:number,openNotice:eNotice,closeNotice:eNotice,addNotice?:eNotice,MainMediator?:string,Size?:{Width:number,Height:number}};
export let MultWindowParamMap:{[id:number]:MultWindowParam} ={
    1         :{id:1,openNotice:eNotice.OpenMultBagLayer,closeNotice:eNotice.ClosMultBagLayer,addNotice:eNotice.AddMultBagLayer ,MainMediator:"BagMultMediator"},//隐私协议面板
    2         :{id:2,openNotice:eNotice.OpenBagLayer,closeNotice:eNotice.CloseBagLayer,Size:{Width:600,Height:800}},//隐私协议面板
    3         :{id:3,openNotice:eNotice.OpenBagLayer,closeNotice:eNotice.CloseBagLayer,Size:{Width:700,Height:800}},//隐私协议面板

    10        :{id:10,openNotice:eNotice.OpenMultChooseServerLayer,closeNotice:eNotice.ClosMultChooseServerLayer,addNotice:eNotice.AddMultMultChooseServerLayer,MainMediator:"SelectServerMultMediator"},//隐私协议面板
    11        :{id:11,openNotice:eNotice.OpenChooseServerLayer,closeNotice:eNotice.ClosChooseServerLayer,Size:{Width:360,Height:800}},//隐私协议面板
};      