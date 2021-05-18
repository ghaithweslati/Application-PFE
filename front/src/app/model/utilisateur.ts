import { EtatUtilisateur } from "../Enum/EtatUtilisateur";
import { Compte } from "./compte"

export class Utilisateur {
    id: number;
      nom: string;
      prenom: string;
      email: string;
      password:string;
      hash: string;
      salt: string;
      photo: Text;
      etat:EtatUtilisateur;
      compte:Compte=new Compte();
}