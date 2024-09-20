export class Code {
    private _language: string;
    private _text: string;

    constructor(language: string, text: string) {
        this._language = language;
        this._text = text;
    }

    get language(): string { return this._language; }
    get text(): string { return this._text; }
    set language(value: string) { this._language = value; }
    set text(value: string) { this._text = value; }
}