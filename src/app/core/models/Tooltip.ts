interface ChartDataDetail {
  name: string;
  value: number;
  label: string;
}

export interface TooltipData {
  data: ChartDataDetail;
  index: number;
  value: number;
  startAngle: number;
  endAngle: number;
  padAngle: number;
  pos: [number, number];  // Coordonnées x, y
}

export interface CountryClickEvent {
  name: string;   // Le nom du pays (correspondant à event.name)
  value: number;  // Le nombre de médailles ou une autre donnée associée
  label?: string; // L'étiquette (optionnelle)
}
