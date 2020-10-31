"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("./client");
var clientType_1 = require("./clientType");
var codeBare_1 = require("./codeBare");
var contact_1 = require("./contact");
var details_1 = require("./details");
var droit_1 = require("./droit");
var droitProduit_1 = require("./droitProduit");
var droitType_1 = require("./droitType");
var entreprise_1 = require("./entreprise");
var individu_1 = require("./individu");
var option_1 = require("./option");
var produit_1 = require("./produit");
var faker = require('faker');
var fs = require('fs');
var NB_INSTANCES = 5;
var tabClient = new Array();
var tabIndividu = new Array();
var tabEntreprise = new Array();
var tabDetails = new Array();
var tabContacts = new Array();
var tabCodeBares = new Array();
var tabDroitProduit = new Array();
var tabOptions = new Array();
var tabDroits = new Array();
var tabProduits = new Array();
function generateCodeBare() {
    var codeBare;
    var addClient2;
    var addIndividu2;
    var addEntreprise2;
    addClient2 = false;
    addIndividu2 = false;
    addEntreprise2 = false;
    if (tabClient.length > 1) {
        addClient2 = true;
    }
    if (tabIndividu.length > 1) {
        addIndividu2 = true;
    }
    if (tabEntreprise.length > 1) {
        addEntreprise2 = true;
    }
    for (var index = 0; index < NB_INSTANCES; index++) {
        codeBare = new codeBare_1.CodeBare();
        codeBare.option = new Array();
        codeBare.produit = new Array();
        codeBare.id = index;
        codeBare.code = faker.random.number();
        switch (index) {
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
                if (addClient2) {
                    codeBare.client = tabClient[1];
                    addClient2 = false;
                }
                else {
                    if (addIndividu2) {
                        codeBare.client = tabIndividu[1];
                        addIndividu2 = false;
                    }
                    else {
                        if (addEntreprise2) {
                            codeBare.client = tabEntreprise[1];
                            addEntreprise2 = false;
                        }
                    }
                }
        }
        var sizeTabProd = void 0;
        sizeTabProd = Math.floor(Math.random() * Math.floor(NB_INSTANCES)) + 1;
        for (var index_1 = 0; index_1 < sizeTabProd; index_1++) {
            codeBare.produit.push(tabProduits[index_1]);
            if ((codeBare.produit[index_1].option != undefined) && !(codeBare.option.includes(codeBare.produit[index_1].option))) {
                codeBare.option.push(codeBare.produit[index_1].option);
            }
        }
        if (codeBare.option.length == 0) {
            var option = void 0;
            option = generateOneOption(NB_INSTANCES + 1);
            codeBare.option.push(option);
        }
        tabCodeBares.push(codeBare);
    }
}
function generateArrayDroitClient() {
    var tabDroitsClient = new Array();
    var sizeTab;
    sizeTab = Math.floor(Math.random() * Math.floor(NB_INSTANCES)) + 1;
    for (var index = 0; index < sizeTab; index++) {
        tabDroitsClient.push(tabDroits[index]);
    }
    return tabDroitsClient;
}
function generateIndividu(id) {
    var individu;
    individu = new individu_1.Individu();
    individu.nom = faker.name.lastName();
    individu.prenom = faker.name.firstName();
    individu.type = clientType_1.ClientType.individu;
    individu.adresse = faker.address.streetAddress();
    individu.email = faker.internet.email();
    individu.idClient = id;
    individu.tabDroit = generateArrayDroitClient();
    individu.details = tabDetails[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
    tabIndividu.push(individu);
}
function generateClient(id) {
    var client;
    client = new client_1.Client();
    client.adresse = faker.address.streetAddress();
    client.idClient = id;
    client.tabDroit = generateArrayDroitClient();
    tabClient.push(client);
}
function generateEntreprise(id) {
    var entreprise;
    entreprise = new entreprise_1.Entreprise();
    entreprise.nom = faker.company.companyName();
    entreprise.adresse = faker.address.streetAddress();
    entreprise.fax = faker.internet.email();
    entreprise.idClient = id;
    entreprise.phone = faker.phone.phoneNumber();
    entreprise.type = clientType_1.ClientType.entreprise;
    entreprise.details = tabDetails[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
    entreprise.contact = tabContacts[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
    entreprise.tabDroit = generateArrayDroitClient();
    tabEntreprise.push(entreprise);
}
function generateDetails() {
    var details;
    for (var index = 0; index < NB_INSTANCES; index++) {
        details = new details_1.Details();
        details.idDetails = index;
        details.province = faker.address.state();
        details.rue = faker.address.streetAddress();
        details.ville = faker.address.city();
        tabDetails.push(details);
    }
}
function generateContacts() {
    var contact;
    for (var index = 0; index < NB_INSTANCES; index++) {
        contact = new contact_1.Contact();
        contact.nom = faker.name.lastName();
        contact.prenom = faker.name.firstName();
        contact.email = faker.internet.email();
        tabContacts.push(contact);
    }
}
function generateDroit() {
    var droit;
    for (var index = 0; index < NB_INSTANCES; index++) {
        droit = new droit_1.Droit();
        droit.idDroit = index.toString();
        droit.dateDebut = faker.date.recent();
        droit.dateFin = faker.date.future();
        droit.type = droitType_1.DroitType[Math.floor(Math.random() * 3)];
        tabDroits.push(droit);
    }
}
function generateProduit() {
    var produit;
    generateOption();
    for (var index = 0; index < NB_INSTANCES; index++) {
        produit = new produit_1.Produit();
        produit.id = index;
        produit.nom = faker.commerce.productName();
        produit.description = faker.commerce.productDescription();
        produit.produit = null; //Aller voir le README.txt pour des explications
        if (tabOptions[index] == null) {
            produit.option = undefined;
        }
        else {
            produit.option = tabOptions[index];
        }
        tabProduits.push(produit);
    }
}
function generateOneOption(id) {
    var option;
    option = new option_1.Option();
    option.id = id;
    option.nom = faker.random.words();
    option.description = faker.lorem.sentence();
    return option;
}
function generateOption() {
    var option;
    for (var index = 0; index < NB_INSTANCES; index++) {
        if (index == 0 || index == 3 || index == 4) {
            option = generateOneOption(index);
            //produit.option = option;
            tabOptions.push(option);
        }
    }
}
function generateDroitAndProduit() {
    var droitproduit;
    generateDroit();
    generateProduit();
    for (var index = 0; index < NB_INSTANCES; index++) {
        droitproduit = new droitProduit_1.DroitProduit();
        droitproduit.produit = tabProduits[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
        droitproduit.droit = tabDroits[Math.floor(Math.random() * Math.floor(NB_INSTANCES))];
        tabDroitProduit.push(droitproduit);
    }
}
function generateClientJsonFile() {
    generateDetails();
    generateContacts();
    var client;
    //Il va toujours avoir au moins une instance de Client, Individu et Entreprise
    //Les 2 autres instances sont aléatoires
    for (var compteur = 0; compteur < NB_INSTANCES; compteur++) {
        switch (compteur) {
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
                var rng = void 0;
                rng = Math.floor(Math.random() * Math.floor(3));
                if (rng == 0) {
                    generateClient(compteur);
                }
                if (rng == 1) {
                    generateIndividu(compteur);
                }
                if (rng == 2) {
                    generateEntreprise(compteur);
                }
        }
    }
    generateCodeBare();
    return { "Clients": tabCodeBares };
}
function generateDroitProduitJsonFile() {
    generateDroitAndProduit();
    return { "DroitsProduits": tabDroitProduit };
}
fs.writeFileSync('./json/dataDroitProduit.json', JSON.stringify(generateDroitProduitJsonFile(), null, '\t'));
fs.writeFileSync('./json/dataClient.json', JSON.stringify(generateClientJsonFile(), null, '\t'));
