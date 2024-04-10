import { BattleSimulationFacade } from "./BattleSimulation/BattleSimulationFacade";
let GBattleSimulation:BattleSimulationFacade;

export function GetBattleSimulation():BattleSimulationFacade{
    return GBattleSimulation;
}

export function SetBattleSimulation( battleSimulationFacade:BattleSimulationFacade):void{
    GBattleSimulation = battleSimulationFacade;
}