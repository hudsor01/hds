// lib/store/use-property-store.ts
import {Property} from '@/lib/types';
import {create} from 'zustand';

interface PropertyStore {
  selectedProperty: Property | null;
  setSelectedProperty: (property: Property | null) => void;
  filters: {
    status: string[];
    sortBy: string;
  };
  setFilters: (filters: {status: string[]; sortBy: string}) => void;
}

export const usePropertyStore = create<PropertyStore>(set => ({
  selectedProperty: null,
  setSelectedProperty: property => set({selectedProperty: property}),
  filters: {
    status: [],
    sortBy: 'created_at',
  },
  setFilters: filters => set({filters}),
}));
