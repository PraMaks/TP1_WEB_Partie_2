import { Droit } from "./droit";
import { Produit } from "./produit";

export class DroitProduit{

    droit: Droit;
    produit: Produit;

    constructor(){
        this.droit = undefined;
        this.produit = undefined;
    }
}