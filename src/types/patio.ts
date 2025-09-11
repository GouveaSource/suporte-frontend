export interface Patio {
  id: string;
  name: string;
  address: string;
  cep: string;
  referencePoint: string | null;
  mapUrl: string;
  phone: string;
  ramal: string | null;
  managerName: string;
}

export type FormData = Omit<Patio, 'id'>;
