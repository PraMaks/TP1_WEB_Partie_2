import { Option } from "./option";

export class Produit{
    id: number;
    nom: string;
    description: string;
    option: Option;

    produit: Produit;

    constructor(){
        this.id = undefined;
        this.nom = undefined;
        this.description = undefined;

        this.produit = /*new Produit()*/ undefined;
    }
}