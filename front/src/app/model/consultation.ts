import { Demandeur } from "./demandeur";
import { Seance } from "./seance";


export class Consultation extends Seance {
      note:number
      demandeur:Demandeur=new Demandeur();
}