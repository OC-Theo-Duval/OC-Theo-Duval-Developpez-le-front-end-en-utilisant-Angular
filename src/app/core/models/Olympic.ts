// TODO: create here a typescript interface for an olympic country
/*
example of an olympic country:
{
    id: 1,
    country: "Italy",
    participations: []
}
*/
import { Parcipation } from "./Participation";

export interface Olympic {
    id: number;
    country: string;
    participations: Parcipation[];
    spotrs: number;
}