'use client'

import { Loader2 } from "-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectItem } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import type { SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

const tenantFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  property: z.string().min(1, "Please select a property"),
  unit: z.string().min(1, "Unit number is required"),
  leaseEnd: z.string().min(1, "Lease end date is required"),
})

type TenantFormValues = z.infer<typeof tenantFormSchema>

interface TenantDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  tenant?: {
    id: string
    name: string
    email: string
    phone: string
    property: string
    unit: string
    leaseEnd: string
  }
  properties: { id: string; name: string; units: string[] }[]
  onSubmitAction: (data: TenantFormValues) => Promise<void>
}

export function TenantDialog({
  open,
  onOpenChangeAction,
  tenant,
  properties,
  onSubmitAction,
}: TenantDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(tenant?.property || "")

  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: tenant || {
      name: "",
      email: "",
      phone: "",
      property: "",
      unit: "",
      leaseEnd: "",
    },
  })

  const handleSubmit = async (data: TenantFormValues) => {
    setIsSubmitting(true)
    try {
      await onSubmitAction(data)
      onOpenChangeAction(false)
      form.reset()
    } catch (error) {
      toast.error(`Failed to ${tenant ? 'update' : 'add'} tenant: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedPropertyUnits = properties.find(p => p.id === selectedProperty)?.units || []

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{tenant ? "Edit Tenant" : "Add Tenant"}</DialogTitle>
          <DialogDescription>
            {tenant
              ? "Update tenant information and lease details"
              : "Add a new tenant to your property"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="(123) 456-7890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="property"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <Select
                    onChange={(event: SelectChangeEvent<unknown>) => {
                      const value = event.target.value as string
                      field.onChange(value)
                      setSelectedProperty(value)
                      form.setValue("unit", "") // Reset unit when property changes
                    }}
                    defaultValue={field.value}
                    placeholder="Select a property"
                  >
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.id}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Unit</FormLabel>
                  <Select
                    onChange={(event: SelectChangeEvent<unknown>) => {
                      field.onChange(event.target.value as string)
                    }}
                    defaultValue={field.value}
                    disabled={!selectedProperty}
                    placeholder="Select a unit"
                  >
                    {selectedPropertyUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="leaseEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lease End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {tenant ? "Update Tenant" : "Add Tenant"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
