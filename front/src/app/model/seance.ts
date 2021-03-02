import { Demandeur } from "./demandeur";
import { Expert } from "./expert";
import { Frais } from "./frais";
import { PeriodeSeance } from "./periode_seance";
import { Sujet } from "./sujet";


export class Seance {
    id: number;
    dureeEffectif: number;
    demandeur: Demandeur=new Demandeur();
    periode_seance: PeriodeSeance=new PeriodeSeance();
    sujet:Sujet= new Sujet();
}