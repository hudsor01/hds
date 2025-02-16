'use client'

import { useState } from 'react'
import { Property, PropertyType, CreatePropertyInput } from '@/types/property'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { cn } from '@/lib/utils'

const propertyFormSchema = z.object({
  name: z.string().min(1, 'Property name is required'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zipCode: z.string().min(5, 'Valid ZIP code is required'),
  propertyType: z.nativeEnum(PropertyType),
  units: z.number().min(1, 'Number of units is required'),
  squareFootage: z.number().min(1, 'Square footage is required'),
  yearBuilt: z.number().min(1800, 'Valid year is required'),
  purchasePrice: z.number().min(0, 'Purchase price is required'),
  currentValue: z.number().min(0, 'Current value is required'),
  monthlyRent: z.number().min(0, 'Monthly rent is required'),
  expenses: z.object({
    mortgage: z.number().optional(),
    insurance: z.number().min(0, 'Insurance amount is required'),
    propertyTax: z.number().min(0, 'Property tax is required'),
    utilities: z.number().min(0, 'Utilities amount is required'),
    maintenance: z.number().min(0, 'Maintenance amount is required'),
    other: z.number().min(0, 'Other expenses amount is required'),
  }),
  imageUrl: z.string().optional(),
})

type PropertyFormProps = {
  initialData?: Property
  onSubmit: (data: CreatePropertyInput) => Promise<void>
  onCancel: () => void
  className?: string
}

export function PropertyForm({ initialData, onSubmit, onCancel, className }: PropertyFormProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: initialData || {
      name: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      propertyType: PropertyType.SINGLE_FAMILY,
      units: 1,
      squareFootage: 0,
      yearBuilt: new Date().getFullYear(),
      purchasePrice: 0,
      currentValue: 0,
      monthlyRent: 0,
      expenses: {
        mortgage: 0,
        insurance: 0,
        propertyTax: 0,
        utilities: 0,
        maintenance: 0,
        other: 0,
      },
    },
  })

  const handleSubmit = async (data: z.infer<typeof propertyFormSchema>) => {
    try {
      setIsLoading(true)
      await onSubmit(data)
    } catch (error) {
      console.error('Error submitting property:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={cn("space-y-8", className)}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter property name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.values(PropertyType).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ZIP Code</FormLabel>
                <FormControl>
                  <Input placeholder="Enter ZIP code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="units"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Units</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter number of units" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="squareFootage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Square Footage</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter square footage" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearBuilt"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Built</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter year built" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purchasePrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purchase Price</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter purchase price" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Value</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter current value" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monthlyRent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly Rent</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="Enter monthly rent" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Monthly Expenses</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="expenses.mortgage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mortgage</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter mortgage payment" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenses.insurance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Insurance</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter insurance cost" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenses.propertyTax"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Tax</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter property tax" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenses.utilities"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utilities</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter utilities cost" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenses.maintenance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter maintenance cost" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expenses.other"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Expenses</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="Enter other expenses" 
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Property' : 'Add Property'}
          </Button>
        </div>
      </form>
    </Form>
  )
}