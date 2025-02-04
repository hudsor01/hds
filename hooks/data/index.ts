import {useApiDelete, useApiMutation, useApiQuery, useApiUpdate} from '../api/use-api';
import type {BaseQueryParams} from '@/types/common';
import type {Lease, MaintenanceRequest, Property, Tenant} from '@/types/database.types';

// Properties hooks
export function useProperties(params?: BaseQueryParams) {
  return useApiQuery<Property[]>('/api/properties', params);
}

export function useProperty(id: string) {
  return useApiQuery<Property>(`/api/properties/${id}`);
}

export function useCreateProperty() {
  return useApiMutation<Property, Omit<Property, 'id'>>('/api/properties');
}

export function useUpdateProperty() {
  return useApiUpdate<Property>('/api/properties');
}

export function useDeleteProperty() {
  return useApiDelete<Property>('/api/properties');
}

// Tenants hooks
export function useTenants(params?: BaseQueryParams) {
  return useApiQuery<Tenant[]>('/api/tenants', params);
}

export function useTenant(id: string) {
  return useApiQuery<Tenant>(`/api/tenants/${id}`);
}

export function useCreateTenant() {
  return useApiMutation<Tenant, Omit<Tenant, 'id'>>('/api/tenants');
}

export function useUpdateTenant() {
  return useApiUpdate<Tenant>('/api/tenants');
}

export function useDeleteTenant() {
  return useApiDelete<Tenant>('/api/tenants');
}

// Leases hooks
export function useLeases(params?: BaseQueryParams) {
  return useApiQuery<Lease[]>('/api/leases', params);
}

export function useLease(id: string) {
  return useApiQuery<Lease>(`/api/leases/${id}`);
}

export function useCreateLease() {
  return useApiMutation<Lease, Omit<Lease, 'id'>>('/api/leases');
}

export function useUpdateLease() {
  return useApiUpdate<Lease>('/api/leases');
}

export function useDeleteLease() {
  return useApiDelete<Lease>('/api/leases');
}

// Maintenance hooks
export function useMaintenanceRequests(params?: BaseQueryParams) {
  return useApiQuery<MaintenanceRequest[]>('/api/maintenance', params);
}

export function useMaintenanceRequest(id: string) {
  return useApiQuery<MaintenanceRequest>(`/api/maintenance/${id}`);
}

export function useCreateMaintenanceRequest() {
  return useApiMutation<MaintenanceRequest, Omit<MaintenanceRequest, 'id'>>('/api/maintenance');
}

export function useUpdateMaintenanceRequest() {
  return useApiUpdate<MaintenanceRequest>('/api/maintenance');
}

export function useDeleteMaintenanceRequest() {
  return useApiDelete<MaintenanceRequest>('/api/maintenance');
}
