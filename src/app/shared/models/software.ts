export class Software {
    private _path: string; // path Path
    private _version: string;

    constructor(
        path: string,
        version: string,
    ) {
        this._path = path;
        this._version = version;
    }
    
    get path() { return this._path; }
    set path(path: string) { this._path = path; }
    get version() { return this._version; }
    set version(version: string) { this._version = version; }

    toFire() {
        return {
            path: this._path,
            version: this._version,
        }
    }
}