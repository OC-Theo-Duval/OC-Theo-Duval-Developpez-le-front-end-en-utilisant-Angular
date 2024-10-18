export interface MedalsByCountry{
name:string;
value:number;
}
export function createMedalsByCountry(name:string,value:number):MedalsByCountry{
  return {name,value};
}
