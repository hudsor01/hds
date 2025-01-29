export interface Unit {
  id: string;
  unit_number: string;
  status: 'vacant' | 'occupied' | 'maintenance';
}

export interface Property {
  id: string;
  name: string;
  address: string;
  units: Unit[];
  created_at?: string;
  updated_at?: string;
  organization_id?: string;
}