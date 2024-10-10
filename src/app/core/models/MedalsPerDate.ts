export interface MedalsPerDate {
  name: string;
  value: number
}

export function createMedalsPerDate(name: string, value: number) {
  return { value, name }
}
