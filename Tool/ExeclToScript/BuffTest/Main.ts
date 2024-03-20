import { IMonsterStruct, MonsterConfig } from "../Work/OutputScript/Monster";
import { AttrCell } from "./Battle/AttrCell";
import { eAttrType, eCampType } from "./Battle/BattleDefine"; 
import { BuffProxy } from "./BuffProxy"; 
let buffProxy:BuffProxy = new BuffProxy();

//首先创建一个战斗模拟对象
let battleSimulation:BattleSimulation = new BattleSimulation()
battleSimulation.SetMaxRound(15);
battleSimulation.SetBattleConfig(eCampType.Initiative,1);
battleSimulation.SetBattleConfig(eCampType.Passivity,2);
battleSimulation.StartSimulation();//开始进行战斗模拟