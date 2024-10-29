import { MedalsPerDate } from './MedalsPerDate'

export interface SerieData {
  name: string;
  series: MedalsPerDate[];
}

export function createSerieData(name: string, series: MedalsPerDate[]): SerieData {
  return { name, series };
}
