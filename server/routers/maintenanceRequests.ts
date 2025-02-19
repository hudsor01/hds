"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface Lease {
  id: string
  property_id: string
  tenant_id: string
  start_date: string
  end_date: string
  rent_amount: number
  property: { name: string }
  tenant: { name: string }
}

export default function Leases() {
  const [leases, setLeases] = useState<Lease[]>([])
  const [properties, setProperties] = useState<{ id: string; name: string }[]>([])
  const [tenants, setTenants] = useState<{ id: string; name: string }[]>([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    property_id: "",
    tenant_id: "",
    start_date: "",
    end_date: "",
    rent_amount: 0,
  })

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchLeases()
    fetchProperties()
    fetchTenants()
  }, [])

  const fetchLeases = async () => {
    const { data, error } = await supabase
      .from("leases")
      .select(`
        *,
        property:properties(name),
        tenant:tenants(name)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching leases:", error)
    } else {
      setLeases(data)
    }
  }

  const fetchProperties = async () => {
    const { data, error } = await supabase
      .from("properties")
      .select("id, name")
      .order("name")

    if (error) {
      console.error("Error fetching properties:", error)
    } else {
      setProperties(data)
    }
  }

  const fetchTenants = async () => {
    const { data, error } = await supabase
      .from("tenants")
      .select("id, name")
      .order("name")

    if (error) {
      console.error("Error fetching tenants:", error)
    } else {
      setTenants(data)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from("leases")
      .insert([formData])

      if (error) {
        console.error("Error inserting lease:", error)
      } else {
        fetchLeases()
        setOpen(false)
        setFormData({
          property_id: "",
          tenant_id: "",
          start_date: "",
          end_date: "",
          rent_amount: 0,
        })
      }
      setLoading(false)
    }

      return (
        <div>
          {/* Your JSX code for Leases */}
          <form onSubmit={handleSubmit}>
            {/* Form Fields for lease data */}
            <Button type="submit" disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit Lease'}
            </Button>
          </form>
        </div>
      )
    }
