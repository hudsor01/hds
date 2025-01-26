
export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
  linkedin?: string
  achievements?: string[]
}

export interface Milestone {
  year: string
  title: string
  description: string
  icon: any // MUI icon component type
  metric: string
}

export interface Value {
  title: string
  description: string
  icon: any // MUI icon component type
  color: string
}
