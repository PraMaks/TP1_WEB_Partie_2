import { Client } from "./client";
import { Contact } from "./contact";
import { Details } from "./details";

export class Entreprise extends Client{
    nom: string;
    phone: string;
    fax: string;
    details: Details;
    contact: Contact;

    constructor(){
        super();
        this.idClient = undefined;
        this.type = undefined;
        this.adresse = undefined;

        this.nom = undefined;
        this.phone = undefined;
        this.fax = undefined;
        this.details = undefined;
        this.contact = undefined;
    }
}