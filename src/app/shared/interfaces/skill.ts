export class Skill {
    private _name: string;
    private _description: string;
    private _icon: string;
    private _content: { [key: string]: any }[];
    
    constructor(name: string, description: string, icon: string, content: { [key: string]: any }[]) {
        this._name = name;
        this._description = description;
        this._icon = icon;
        this._content = content;
    }

    get name() { return this._name; }
    get description() { return this._description; }
    get icon() { return this._icon; }
    get content() { return this._content; }
}