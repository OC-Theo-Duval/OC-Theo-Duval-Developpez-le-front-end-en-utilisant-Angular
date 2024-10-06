export interface MedalsPerDate {
  name: Date;
  value: number
}

export function createMedalsPerDate(name: Date, value: number) {
  return { value, name }
}
