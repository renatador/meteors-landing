export type MeteorId = string;
export type Geolocation = {
    type:string;
    coordinates:number[];
}

export type Meteor = {
    id: MeteorId;
    name: string;
    nametype: string;
    recclass: string;
    mass: number;
    fall: string;
    year:Date;
    reclat: number;
    reclong:number;
    geolocation:Geolocation;
};

export type Filter = {
    operator:string;
    mass:string;
}
