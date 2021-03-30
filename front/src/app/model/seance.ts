import { Demandeur } from "./demandeur";
import { Expert } from "./expert";
import { Frais } from "./frais";
import { PeriodeSeance } from "./periode_seance";
import { Sujet } from "./sujet";

import { statusSeance } from "../Enum/statusSeance";


export class Seance {
    id: number;
    dureeEffectif: number;
    periode_seance: PeriodeSeance=new PeriodeSeance();
    sujet:Sujet= new Sujet();
    status:statusSeance;
}