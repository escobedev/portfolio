import { Achievement } from "./achievement";
import { Software } from "./software";

export class Certificate extends Achievement {
    private _code: string;
    
    constructor(
        name: string,
        issuer: string,
        code: string,
        date: Date,
        url: string,
        image: string,
        pdf: string,
        content: string[],
        tags: string[],
        skills: Software[],
    ) {
        super(name, issuer, date, url, image, pdf, content, tags, skills);
        this._code = code;
    }

    get code() { return this._code; }
    set code(code: string) { this._code = code; }

    override toFire() {
        return {
            name: this._name,
            issuer: this._issuer,
            code: this._code,
            date: this._date,
            url: this._url,
            image: this._image,
            pdf: this._pdf,
            content: this._content,
            tags: this._tags,
            skills: this._skills.every(skill => skill.toFire()),
        }
    }
}