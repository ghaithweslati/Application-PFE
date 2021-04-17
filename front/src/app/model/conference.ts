import { TypeConference } from "../Enum/TypeConference";
import { Demandeur } from "./demandeur";
import { Seance } from "./seance";


export class Conference extends Seance {
      type:TypeConference;
      demandeurs:Demandeur[]=[];
}