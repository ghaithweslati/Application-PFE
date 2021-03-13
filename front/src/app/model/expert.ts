import { Domaine } from "./domaine";
import { Utilisateur } from "./utilisateur";

export class Expert extends Utilisateur {
      domaine:Domaine=new Domaine();
      specialite: string;

}