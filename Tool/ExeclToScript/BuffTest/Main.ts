import fs from "fs"
import * as fflate from './fflate';
import { BattleAnalysis } from "./BattleAnalysis/BattleAnalysis";
import { BattleSimulation } from "./BattleSimulation/BattleSimulation";
import { BattleSimulationFacade } from "./BattleSimulation/BattleSimulationFacade"; 
import { eCampType } from "./BattleSimulation/Define/BattleDefine";
import { SetBattleSimulation } from "./Global";
//首先创建一个战斗模拟对象
export let battleSimulation:BattleSimulationFacade = new BattleSimulationFacade(new BattleSimulation());
SetBattleSimulation(battleSimulation);
battleSimulation.SetMaxRound(15);
battleSimulation.SetBattleInfoByConfig(eCampType.Initiative,1);
battleSimulation.SetBattleInfoByConfig(eCampType.Passivity, 2);
battleSimulation.StartSimulationBattle(); 
BattleAnalysis.Ins.OutPutRecord(battleSimulation.mRecordArray);
  
let buf = fflate.strToU8(JSON.stringify(battleSimulation.mRecordArray));
const compressed = fflate.compressSync(buf, { level: 6, mem: 8 });
fs.writeFileSync("./qqq",compressed); 
console.log(JSON.stringify(battleSimulation.mRecordArray));