import { Timestamp } from "@angular/fire/firestore";
import { Tag } from "./tag";
import { Software } from "./software";

export class Achievement {
    protected _name: string;
    protected _issuer: string; // Entity Path
    protected _date: Timestamp;
    protected _url: string;
    protected _image: string;
    protected _pdf: string;
    protected _content: string[];
    protected _tags: (string | Tag)[];
    protected _skills: Software[];
    
    constructor(
        name: string,
        issuer: string,
        date: Date,
        url: string,
        image: string,
        pdf: string,
        content: string[],
        tags: (string | Tag)[],
        skills: Software[],
    ) {
        this._name = name;
        this._issuer = issuer;
        this._date = Timestamp.fromDate(date);
        this._url = url;
        this._image = image;
        this._pdf = pdf;
        this._content = content;
        this._tags = tags;
        this._skills = skills;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get issuer() { return this._issuer; }
    set issuer(issuer: string) { this._issuer = issuer; }
    get date() { return this._date; }
    set date(date: Timestamp) { this._date = date; }
    get url() { return this._url; }
    set url(url: string) { this._url = url; }
    get image() { return this._image; }
    set image(image: string) { this._image = image; }
    get pdf() { return this._pdf; }
    set pdf(pdf: string) { this._pdf = pdf; }
    get content() { return this._content; }
    set content(content: string[]) { this._content = content; }
    get tags() { return this._tags; }
    set tags(tags: (string | Tag)[]) { this._tags = tags; }
    get skills() { return this._skills; }
    set skills(skills: Software[]) { this._skills = skills; }

    addContent(content: string) { this._content.push(content); }
    updateContent(index: number, content: string) { this._content[index] = content; }
    moveContent(previousIndex: number, newIndex: number) {
        const content = this._content[previousIndex];
        this._content.splice(previousIndex, 1);
        this._content.splice(newIndex, 0, content);
    }
    removeContent(index: number) { this._content.splice(index, 1); }
    clearContent() { this._content = []; }

    addTag(tag: string) { this._tags.push(tag); }
    updateTag(tag: string, index: number) { this._tags[index] = tag; }
    moveTag(previousIndex: number, newIndex: number) {
        const tag = this._tags[previousIndex];
        this._tags.splice(previousIndex, 1);
        this._tags.splice(newIndex, 0, tag);
    }
    removeTag(index: number) { this._tags.splice(index, 1); }
    clearTags() { this._tags = []; }

    addSkill(skill: Software) { this._skills.push(skill); }
    updateSkill(skill: Software, index: number) { this._skills[index] = skill; }
    moveSkill(previousIndex: number, newIndex: number) {
        const skill = this._skills[previousIndex];
        this._skills.splice(previousIndex, 1);
        this._skills.splice(newIndex, 0, skill);
    }
    removeSkill(index: number) { this._skills.splice(index, 1); }
    clearSkills() { this._skills = []; }

    toFire() {
        return {
            name: this._name,
            issuer: this._issuer,
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
