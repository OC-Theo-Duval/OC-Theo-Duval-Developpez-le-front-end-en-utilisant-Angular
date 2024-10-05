export interface MedalsByCountry{
name:String;
value:number;
}
export function createMedalsByCountry(name:String,value:number):MedalsByCountry{
  return {name,value};
}
