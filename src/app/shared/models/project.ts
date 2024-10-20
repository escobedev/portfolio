import { Software } from "./software";

export class Project {
    private _name: string;
    private _type: string;
    private _icon: string;
    private _details: string[];
    private _tags: string[];
    private _technologies: Software[];
    private _link: string;
    private _github: string;

    constructor(
        name: string,
        type: string,
        icon: string,
        details: string[],
        tags: string[],
        technologies: Software[],
        link: string,
        github: string,
    ) {
        this._name = name;
        this._type = type;
        this._icon = icon;
        this._details = details;
        this._tags = tags;
        this._technologies = technologies;
        this._link = link;
        this._github = github;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get type() { return this._type; }
    set type(type: string) { this._type = type; }
    get icon() { return this._icon; }
    set icon(icon: string) { this._icon = icon; }
    get details() { return this._details; }
    set details(details: string[]) { this._details = details; }
    get tags() { return this._tags; }
    set tags(tags: string[]) { this._tags = tags; }
    get technologies() { return this._technologies; }
    set technologies(technologies: Software[]) { this._technologies = technologies; }
    get link() { return this._link; }
    set link(link: string) { this._link = link; }
    get github() { return this._github; }
    set github(github: string) { this._github = github; }

    toFire () {
        return {
            name: this._name,
            type: this._type,
            icon: this._icon,
            details: this._details,
            tags: this._tags,
            technologies: this._technologies.every(tag => tag.toFire()),
            link: this._link,
            github: this._github,
        }
    }
}