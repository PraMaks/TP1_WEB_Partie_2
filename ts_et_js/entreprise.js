"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Entreprise = void 0;
var client_1 = require("./client");
var Entreprise = /** @class */ (function (_super) {
    __extends(Entreprise, _super);
    function Entreprise() {
        var _this = _super.call(this) || this;
        _this.idClient = undefined;
        _this.type = undefined;
        _this.adresse = undefined;
        _this.nom = undefined;
        _this.phone = undefined;
        _this.fax = undefined;
        _this.details = undefined;
        _this.contact = undefined;
        return _this;
    }
    return Entreprise;
}(client_1.Client));
exports.Entreprise = Entreprise;
