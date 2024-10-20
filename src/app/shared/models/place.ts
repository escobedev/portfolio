import { GeoPoint } from "@angular/fire/firestore";

export class Place {
    private _name: string;
    private _address: string | null;
    private _district: string | null;
    private _city: string | null;
    private _region: string | null;
    private _country: string | null;
    private _zip: string | null;
    private _geopoint: GeoPoint | null;

    constructor(
        name: string,
        address?: string,
        district?: string,
        city?: string,
        region?: string,
        country?: string,
        zip?: string,
        latlong?: { lat: number, long: number },
    ) {
        this._name = name;
        this._address = address ?? null;
        this._district = district ?? null;
        this._city = city ?? null;
        this._region = region ?? null;
        this._country = country ?? null;
        this._zip = zip ?? null;
        this._geopoint = latlong ? new GeoPoint(latlong.lat, latlong.long) : null;
    }

    get name() { return this._name; }
    set name(name: string) { this._name = name; }
    get address(): string | null { return this._address; }
    set address(address: string) { this._address = address; }
    get district(): string | null { return this._district; }
    set district(district: string) { this._district = district; }
    get city(): string | null { return this._city; }
    set city(city: string) { this._city = city; }
    get region(): string | null { return this._region; }
    set region(region: string) { this._region = region; }
    get country(): string | null { return this._country; }
    set country(country: string) { this._country = country; }
    get zip(): string | null { return this._zip; }
    set zip(zip: string) { this._zip = zip; }
    get geopoint(): { lat: number, long: number } | null { return this._geopoint ? { lat: this._geopoint.latitude, long: this._geopoint.longitude } : null; }
    set geopoint(latlong: { lat: number, long: number }) { this._geopoint = new GeoPoint(latlong.lat, latlong.long); }

    toFire() {
        return {
            name: this._name,
            address: this._address,
            district: this._district,
            city: this._city,
            region: this._region,
            country: this._country,
            zip: this._zip,
            geopoint: this._geopoint,
        }
    }
}