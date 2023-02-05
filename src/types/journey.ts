export interface Journey {
  id: string;
  departureTime: string;
  returnTime: string;
  departureStationId: string;
  departureStation: string;
  returnStationId: string;
  returnStation: string;
  coveredDistance: number;
  duration: number;
}
