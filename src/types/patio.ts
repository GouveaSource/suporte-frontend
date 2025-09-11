export interface Patio {
  id: string;
  name: string;
  address: string;
  cep: string;
  referencePoint: string | null;
  mapUrl: string | null;
  phone: string;
  ramal: string | null;
  managerName: string | null;
}

export type FormData = Omit<Patio, 'id'>;
