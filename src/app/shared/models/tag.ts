export class Tag {
    private _name: string;
    private _image: string;
    private _type: string;
    private _level: string;
    private _path: string;

    constructor(
        name: string,
        image: string,
        type: string,
        level: string,
        path: string,
    ) {
        this._name = name;
        this._image = image;
        this._type = type;
        this._level = level;
        this._path = path;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get image() { return this._image; }
    set image(image: string) { this._image = image; }
    get type() { return this._type; }
    set type(type: string) { this._type = type; }
    get level() { return this._level; }
    set level(level: string) { this._level = level; }
    get path() { return this._path; }
    set path(path: string) { this._path = path; }

    toFire() {
        return {
            name: this._name,
            image: this._image,
            type: this._type,
            level: this._level,
            path: this._path,
        }
    }
}
