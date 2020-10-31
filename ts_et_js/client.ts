import {ClientType} from "./clientType";
import { Droit } from "./droit";

export class Client{
    idClient: number;
    type: ClientType;
    adresse: string;
    tabDroit: Array<Droit>;

    constructor(){
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;
        this.tabDroit = undefined;
    }

}