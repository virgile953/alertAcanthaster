export interface Sighting {
  id: number;
  latitude: number;
  longitude: number;
  count: number;
  certainty: number;
  createdAt: string;
}

export type SightingInput = Omit<Sighting, 'id' | 'createdAt'>;

export interface ApiResponse {
  success: boolean;
  data?: Sighting;
  error?: string;
}
