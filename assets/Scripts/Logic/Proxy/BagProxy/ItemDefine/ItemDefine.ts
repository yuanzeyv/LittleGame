//这一部分是网络消息通知
export type ItemBaseType = {
    GoodsID:number;//每个道具的唯一ID
    ItemID:number;//道具的ItemID
    Count:number;//拥有道具的数量
    SID:string;//道具的拥有者UID

    AwardSID:string;//道具的获得者UID
    AwardTime:number;//道具的生成时间
    AwardWay:number;//道具的获得者UID
};

export type EquipBaseType = {
    ItemBaseType:ItemBaseType;
    Quality:number;//装备的品质
    AttrAddtionMap:{[key:number]:number};
};


export class ItemCell{
    private mItemInfo:ItemBaseType;
    public constructor(itemInfo:ItemBaseType){
        this.mItemInfo = itemInfo;
    }
    public get SingleID():number{//每个道具的唯一ID
        return this.mItemInfo.AwardTime;
    }
    public get ItemID():number{//道具的ItemID
        return this.mItemInfo.ItemID;
    }
    public get Count():number{//拥有道具的数量
        return this.mItemInfo.Count;
    }
    public get AwardTime():number{//道具的生成时间
        return this.mItemInfo.AwardTime;
    }
    public get AwardUID():string{//道具的获得者UID
        return this.mItemInfo.AwardUID;
    }
    public get AwardWay():number{//道具的获得者UID
        return this.mItemInfo.AwardWay;
    }
    public get OwnerUID():string{//道具的拥有者UID
        return this.mItemInfo.OwnerUID;
    }
};

export class EquipCell extends ItemCell{
    public mEquipInfo:EquipBaseType;
    public constructor(itemInfo:EquipBaseType){
        super(itemInfo.ItemBaseType);
        this.mEquipInfo = itemInfo;
    }
    
}