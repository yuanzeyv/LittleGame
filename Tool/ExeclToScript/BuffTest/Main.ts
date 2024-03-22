import fs from "fs"
import * as fflate from './fflate';
import { BattleAnalysis } from "./BattleAnalysis/BattleAnalysis";
import { BattleSimulation } from "./BattleSimulation/BattleSimulation";
import { BattleSimulationFacade } from "./BattleSimulation/BattleSimulationFacade"; 
//首先创建一个战斗模拟对象
export let battleSimulation:BattleSimulationFacade = new BattleSimulationFacade(new BattleSimulation())
battleSimulation.SetBattleInfo(15,1,2);
battleSimulation.StartSimulationBattle(); 
BattleAnalysis.Ins.OutPutRecord(battleSimulation.mRecordArray)
  
let buf = fflate.strToU8(JSON.stringify(battleSimulation.mRecordArray))
const compressed = fflate.compressSync(buf, { level: 6, mem: 8 });
fs.writeFileSync("./qqq",compressed);
 