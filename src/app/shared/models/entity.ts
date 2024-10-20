export class Entity {
    private _name: string;
    private _logo: string;
    private _url: string;
    private _path: string;

    constructor(
        name: string,
        logo: string,
        url: string,
        path: string,
    ) {
        this._name = name;
        this._logo = logo;
        this._url = url;
        this._path = path;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get logo() { return this._logo; }
    set logo(logo: string) { this._logo = logo; }
    get url() { return this._url; }
    set url(url: string) { this._url = url; }
    get path() { return this._path; }
    set path(path: string) { this._path = path; }

    toFire() {
        return {
            name: this._name,
            logo: this._logo,
            url: this._url,
            path: this._path,
        }
    }
}