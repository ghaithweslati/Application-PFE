import { Conference } from "./conference";
import { Consultation } from "./consultation";
import { Seance } from "./seance";


export class Notification {
    id: number;
      texte: string;
      date: string= new Date().toISOString().substr(0,10)+" "+new Date().toISOString().substr(11,5);
      vu:boolean;
      consultation: Consultation=new Consultation();
      conference:Conference=new Conference();
}