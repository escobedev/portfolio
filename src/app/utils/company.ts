import { Place } from "./place";

export class Company {
    private _name: string;
    private _logo: string;
    private _description: string;
    private _industry: string;
    private _location: Place;

    constructor(
        name: string,
        logo: string,
        description: string,
        industry: string,
        location: Place,
    ) {
        this._name = name;
        this._logo = logo;
        this._description = description;
        this._industry = industry;
        this._location = location;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get logo() { return this._logo; }
    set logo(logo: string) { this._logo = logo; }
    get description() { return this._description; }
    set description(description: string) { this._description = description; }
    get industry() { return this._industry; }
    set industry(industry: string) { this._industry = industry; }
    get location() { return this._location; }
    set location(location: Place) { this._location = location; }

    toFire() {
        return {
            name: this._name,
            logo: this._logo,
            description: this._description,
            industry: this._industry,
            location: this._location.toFire(),
        }
    }
}