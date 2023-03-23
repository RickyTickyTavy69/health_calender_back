import { Injectable } from "@nestjs/common";
import { ICycle } from "./cycles.types";

Injectable()
export class CycleCounter{

  async countCycles(body){
    const {firstDay, periodDuration, cycleDuration} = body;
    //2023-03-06T20:38:00.000Z
    //5
    //28
    console.log("info cycle", firstDay, periodDuration, cycleDuration);
    console.log("type", typeof firstDay);
    const firstDayDate = new Date(firstDay); // here it converts the date String to the Date format.

    const cyclesData: Array<ICycle> = [];

    const periodDays: Array<Date> = [];
    let currentDayDate = firstDayDate;
    periodDays.push(new Date(currentDayDate.toString()));
    for(let x = 0; x < periodDuration - 1; x++){
      currentDayDate.setUTCDate(currentDayDate.getUTCDate() + 1);
     periodDays.push(new Date(currentDayDate.toString()));
    }

    currentDayDate = new Date(firstDay);
    currentDayDate.setUTCDate(currentDayDate.getUTCDate() + (cycleDuration - 13));
    const ovulationDay =  new Date(currentDayDate.toString());


    currentDayDate = new Date(firstDay);
    currentDayDate.setUTCDate(currentDayDate.getUTCDate() + (cycleDuration - (5 + 13)));
    const luteralDaysBegin =  new Date(currentDayDate.toString());


    const lutealDays : Array<Date> = [];
    lutealDays.push(new Date(luteralDaysBegin.toString()));
    for(let x = 0; x < 6; x++){
      luteralDaysBegin.setUTCDate(luteralDaysBegin.getUTCDate() + 1);
      lutealDays.push(new Date(luteralDaysBegin.toString()));
    }

    const cycle = {
      periodDays,
      lutealDays,
      ovulationDay,
    }

    cyclesData.push(cycle);

    console.log("cycleDate", cyclesData);
  }

}