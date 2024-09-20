import { Timestamp } from "@angular/fire/firestore"
import { Tag } from "./tag";
import { Software } from "./software";

export class Job {
    private _position: string;
    private _company: string; // Company Path
    private _startDate: Timestamp;
    private _endDate: Timestamp;
    private _hardSkills: (Tag | Software)[]; // Tag Paths
    private _softSkills: Tag[]; // Tag Paths
    private _responsibilities: string[];

    constructor(
        position: string,
        company: string,
        startDate: Date,
        endDate: Date,
        hardSkills: (Tag | Software)[],
        softSkills: Tag[],
        responsibilities: string[],
    ) {
        this._position = position;
        this._company = company;
        this._startDate = Timestamp.fromDate(startDate);
        this._endDate = Timestamp.fromDate(endDate);
        this._hardSkills = hardSkills;
        this._softSkills = softSkills;
        this._responsibilities = responsibilities;
    }

    get position() { return this._position; }
    set position(position: string) { this._position = position; }
    get company() { return this._company; }
    set company(company: string) { this._company = company; }
    get startDate() { return this._startDate.toDate(); }
    set startDate(startDate: Date) { this._startDate = Timestamp.fromDate(startDate); }
    get endDate() { return this._endDate.toDate(); }
    set endDate(endDate: Date) { this._endDate = Timestamp.fromDate(endDate); }
    get hardSkills() { return this._hardSkills; }
    set hardSkills(hardSkills: (Tag | Software)[]) { this._hardSkills = hardSkills; }
    get softSkills() { return this._softSkills; }
    set softSkills(softSkills: Tag[]) { this._softSkills = softSkills; }
    get responsibilities() { return this._responsibilities; }
    set responsibilities(responsibilities: string[]) { this._responsibilities = responsibilities; }

    toFire() {
        return {
            position: this._position,
            company: this._company,
            startDate: this._startDate,
            endDate: this._endDate,
            hardSkills: this._hardSkills.every(skill => skill.toFire()),
            softSkills: this._softSkills.every(skill => skill.toFire()),
            responsibilities: this._responsibilities,
        }
    }
}