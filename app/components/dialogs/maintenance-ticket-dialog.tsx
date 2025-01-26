'use client'

import { Button } from "@/components/ui/button"
import
  {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectItem } from "@/components/ui/select"
import Textarea from "@/components/ui/textarea"
import type { MaintenancePriority, MaintenanceTicket, NewMaintenanceTicket } from "@/types/maintenance"
import type { SelectChangeEvent } from "@mui/material"
import { useState } from "react"

interface Property {
  id: string
  name: string
  units: { id: string; number: string }[]
}

// Mock data for development
const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop1",
    name: "Sunset Apartments",
    units: [
      { id: "unit1", number: "1A" },
      { id: "unit2", number: "1B" },
      { id: "unit3", number: "2A" },
    ],
  },
  {
    id: "prop2",
    name: "Ocean View Complex",
    units: [
      { id: "unit4", number: "101" },
      { id: "unit5", number: "102" },
      { id: "unit6", number: "103" },
    ],
  },
]

interface MaintenanceTicketDialogProps {
  open: boolean
  onOpenChangeAction: (open: boolean) => void
  existingTicket?: MaintenanceTicket
  onSubmitAction: (data: NewMaintenanceTicket) => Promise<void>
}

export function MaintenanceTicketDialog({
  open,
  onOpenChangeAction,
  existingTicket,
  onSubmitAction,
}: MaintenanceTicketDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState<string>(
    existingTicket?.propertyId || ""
  )
  const [selectedUnit, setSelectedUnit] = useState<string>(
    existingTicket?.unitId || ""
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(e.currentTarget)
      const data: NewMaintenanceTicket = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        priority: formData.get("priority") as MaintenancePriority,
        propertyId: selectedProperty,
        unitId: selectedUnit || undefined,
      }

      await onSubmitAction(data)
      onOpenChangeAction(false)
    } catch (error) {
      console.error("Failed to submit ticket:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const selectedPropertyUnits = MOCK_PROPERTIES.find(
    (p) => p.id === selectedProperty
  )?.units || []

  return (
    <Dialog open={open} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {existingTicket ? "Edit Maintenance Ticket" : "Create Maintenance Ticket"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="property">Property</Label>
            <Select
              value={selectedProperty}
              onChange={(event: SelectChangeEvent<unknown>) => {
                setSelectedProperty(event.target.value as string)
              }}
              required
              placeholder="Select a property"
            >
              {MOCK_PROPERTIES.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </Select>
          </div>

          {selectedProperty && (
            <div>
              <Label htmlFor="unit">Unit (Optional)</Label>
              <Select
                value={selectedUnit}
                onChange={(event: SelectChangeEvent<unknown>) => {
                  setSelectedUnit(event.target.value as string)
                }}
                placeholder="Select a unit"
              >
                {selectedPropertyUnits.map((unit) => (
                  <SelectItem key={unit.id} value={unit.id}>
                    Unit {unit.number}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              defaultValue={existingTicket?.title}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={existingTicket?.description}
              required
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              name="priority"
              defaultValue={existingTicket?.priority || "medium"}
              required
              placeholder="Select priority"
            >
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </Select>
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChangeAction(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading
                ? "Submitting..."
                : existingTicket
                ? "Update Ticket"
                : "Create Ticket"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
