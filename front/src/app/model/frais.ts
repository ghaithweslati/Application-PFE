import { Sujet } from "./sujet";


export class Frais {
    id: number;
    duree: number;
    prix: number;
    sujet: Sujet=new Sujet();
}