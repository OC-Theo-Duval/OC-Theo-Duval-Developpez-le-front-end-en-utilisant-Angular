import { Participation } from './Participation';

export interface OlympicCountry {
  id: string;
  country: string;
  participations: Participation[];
}
