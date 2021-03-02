import { Expert } from "./expert";
import { Frais } from "./frais";


export class Sujet {
    id: number;
    titre: string;
    description: string;
    expert: Expert=new Expert();
    frais:Frais[]=[];
}