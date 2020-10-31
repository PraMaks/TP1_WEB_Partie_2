import { Client } from "./client";
import { ClientType } from "./clientType";
import { CodeBare } from "./codeBare";
import { Contact } from "./contact";
import { Details } from "./details";
import { Droit } from "./droit";
import { DroitProduit } from "./droitProduit";
import { DroitType } from "./droitType";
import { Entreprise } from "./entreprise";
import { Individu } from "./individu";
import { Option } from "./option";
import { Produit } from "./produit";

const faker = require('faker');
const fs = require('fs');
const NB_INSTANCES = 5;

let tabClient: Array<Client> = new Array();
let tabIndividu: Array<Individu> = new Array();
let tabEntreprise: Array<Entreprise> = new Array();
let tabDetails: Array<Details> = new Array();
let tabContacts: Array<Contact> = new Array();
let tabCodeBares: Array<CodeBare> = new Array();

let tabDroitProduit: Array<DroitProduit> = new Array();
let tabOptions: Array<Option> = new Array();
let tabDroits: Array<Droit> = new Array();
let tabProduits: Array<Produit> = new Array();

function generateCodeBare(){
    let codeBare: CodeBare;

    let addClient2: boolean;
    let addIndividu2: boolean;
    let addEntreprise2: boolean;

    addClient2 = false;
    addIndividu2 = false;
    addEntreprise2 = false;

    if(tabClient.length > 1){
        addClient2 = true;
    }
    if(tabIndividu.length > 1){
        addIndividu2 = true;
    }
    if(tabEntreprise.length > 1){
        addEntreprise2 = true;
    }

    for(let index = 0; index < NB_INSTANCES; index++){

        codeBare = new CodeBare();
        codeBare.option = new Array();
        codeBare.produit = new Array();

        codeBare.id = index;
        codeBare.code = faker.random.number();

        
        switch(index){
            case 0:
                codeBare.client = tabClient[0];
                break;
            case 1:
                codeBare.client = tabIndividu[0];
                break;
            case 2: 
                codeBare.client = tabEntreprise[0];
                break;
            default:
                if(addClient2){
                    codeBare.client = tabClient[1];
                    addClient2 = false;
                }
                else{
                    if(addIndividu2){
                        codeBare.client = tabIndividu[1];
                        addIndividu2 = false;
                    }
                    else{
                        if(addEntreprise2){
                            codeBare.client = tabEntreprise[1];
                            addEntreprise2 = false;
                        }
                    }
                }
        }
  
        let sizeTabProd: number;
        sizeTabProd = Math.floor(Math.random() * Math.floor(NB_INSTANCES)) + 1;

        for(let index = 0; index < sizeTabProd; index++){
            codeBare.produit.push(tabProduits[index]);
            if((codeBare.produit[index].option != undefined) && !(codeBare.option.includes(codeBare.produit[index].option))){
                codeBare.option.push(codeBare.produit[index].option);
            }
        }

        if(codeBare.option.length == 0){
            let option: Option;
            option = generateOneOption(NB_INSTANCES + 1);
            codeBare.option.push(option);
        }

        tabCodeBares.push(codeBare);

    }
}

function generateArrayDroitClient(){
    let tabDroitsClient: Array<Droit> = new Array();

    let sizeTab: number;
    sizeTab = Math.floor(Math.random() * Math.floor(NB_INSTANCES)) + 1;

    for(let index = 0; index < sizeTab; index++){
        tabDroitsClient.push(tabDroits[index]);
    }

    return tabDroitsClient;
}

function generateIndividu(id: number){
    let individu: Individu;

    individu = new Individu();
    individu.nom = faker.name.lastName();
    individu.prenom = faker.name.firstName();
    individu.type = ClientType.individu;
    individu.adresse = faker.address.streetAddress();
    individu.email = faker.internet.email();
    individu.idClient = id;
    individu.tabDroit = generateArrayDroitClient();
    individu.details = tabDetails[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];

    tabIndividu.push(individu);
}

function generateClient(id: number){
    let client: Client;

    client = new Client();
    client.adresse = faker.address.streetAddress();
    client.idClient = id;
    client.tabDroit = generateArrayDroitClient();

    tabClient.push(client);
}

function generateEntreprise(id: number){
    let entreprise: Entreprise;

    entreprise = new Entreprise();
    entreprise.nom = faker.company.companyName();
    entreprise.adresse = faker.address.streetAddress();
    entreprise.fax = faker.internet.email();
    entreprise.idClient = id;
    entreprise.phone = faker.phone.phoneNumber();
    entreprise.type = ClientType.entreprise;
    entreprise.details = tabDetails[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
    entreprise.contact = tabContacts[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
    entreprise.tabDroit = generateArrayDroitClient();

    tabEntreprise.push(entreprise);
}

function generateDetails(){
    let details: Details;

    for(let index = 0; index < NB_INSTANCES; index++){
        details = new Details();
        details.idDetails = index;
        details.province = faker.address.state();
        details.rue = faker.address.streetAddress();
        details.ville = faker.address.city();

        tabDetails.push(details);
    }
}

function generateContacts(){
    let contact: Contact;

    for(let index = 0; index < NB_INSTANCES; index++){
        contact = new Contact();
        contact.nom = faker.name.lastName();
        contact.prenom = faker.name.firstName();
        contact.email = faker.internet.email();

        tabContacts.push(contact);
    }    
}

function generateDroit(){
    let droit: Droit;

    for(let index = 0; index < NB_INSTANCES; index++){
        droit = new Droit();
        droit.idDroit = index.toString();
        droit.dateDebut = faker.date.recent();
        droit.dateFin = faker.date.future();
        droit.type = DroitType[Math.floor(Math.random() * 3)] as unknown as DroitType;

        tabDroits.push(droit);
    }    
}

function generateProduit(){
    let produit: Produit;

    generateOption();

    for(let index = 0; index < NB_INSTANCES; index++){
        produit = new Produit();
        produit.id = index;
        produit.nom = faker.commerce.productName();
        produit.description = faker.commerce.productDescription();
        produit.produit = null; //Aller voir le README.txt pour des explications

        if(tabOptions[index] == null){
            produit.option = undefined;
        }
        else{
            produit.option = tabOptions[index];
        }

        tabProduits.push(produit);
    }    
}

function generateOneOption(id: number){
    let option: Option;

    option = new Option();
    option.id = id;
    option.nom = faker.random.words();
    option.description = faker.lorem.sentence();

    return option;
}

function generateOption(){
    let option: Option;
    for(let index = 0; index < NB_INSTANCES; index++){
        if(index == 0 || index == 3 || index == 4){
            option = generateOneOption(index);

            //produit.option = option;
            tabOptions.push(option);
        }       
    }    
}

function generateDroitAndProduit(){
   let droitproduit: DroitProduit;
   generateDroit();
   generateProduit();

   for(let index = 0; index < NB_INSTANCES; index++){
       droitproduit = new DroitProduit();
       droitproduit.produit = tabProduits[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
       droitproduit.droit = tabDroits[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];

       tabDroitProduit.push(droitproduit);
   }

}

function generateClientJsonFile(){
    generateDetails();
    generateContacts();

    let client;

    //Il va toujours avoir au moins une instance de Client, Individu et Entreprise
    //Les 2 autres instances sont aléatoires
    for(let compteur = 0; compteur < NB_INSTANCES; compteur++){
        switch(compteur){
            case 0:
                generateClient(compteur);
                break;
            case 1:
                generateIndividu(compteur);
                break;
            case 2:
                generateEntreprise(compteur);
                break;
            default:
                let rng: number;
                rng = Math.floor(Math.random() * Math.floor(3));
                if(rng == 0){
                    generateClient(compteur);
                }
                if(rng == 1){
                    generateIndividu(compteur);
                }
                if(rng == 2){
                    generateEntreprise(compteur);
                }
        }
        
    }

    generateCodeBare();

    return {"Clients": tabCodeBares};
}

function generateDroitProduitJsonFile(){
    generateDroitAndProduit();
    return {"DroitsProduits": tabDroitProduit};
}

fs.writeFileSync('./json/dataDroitProduit.json', JSON.stringify(generateDroitProduitJsonFile(), null, '\t'))
fs.writeFileSync('./json/dataClient.json', JSON.stringify(generateClientJsonFile(), null, '\t'))