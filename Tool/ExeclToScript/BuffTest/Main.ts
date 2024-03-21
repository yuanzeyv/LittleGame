import { BattleSimulation } from "./BattleSimulation/BattleSimulation";
import { BattleSimulationFacade } from "./BattleSimulation/BattleSimulationFacade"; 
//首先创建一个战斗模拟对象
export let battleSimulation:BattleSimulationFacade = new BattleSimulationFacade(new BattleSimulation())
battleSimulation.SetBattleInfo(15,1,2);
battleSimulation.StartSimulationBattle(); 
console.log(battleSimulation.mRecordArray);  