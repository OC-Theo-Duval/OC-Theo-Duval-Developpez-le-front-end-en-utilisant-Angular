// TODO: create here a typescript interface for an olympic country

import { Participation } from "./Participation";

/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
export class Olympics {
    id: number;
    country: string;
    participations: Participation[];

    constructor(id: number, country: string, participations: Participation[]) {
        this.id = id;
        this.country = country;
        this.participations = participations;
    }
}
