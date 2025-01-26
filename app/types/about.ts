import { type ComponentType, type SVGProps } from 'react'

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export interface Value {
  title: string
  description: string
  icon: ComponentType<SVGProps<SVGSVGElement>>
}

export interface Milestone {
  year: string
  title: string
  description: string
}
