// types/badge.ts
import { VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

// Define the BadgeProps interface
export interface BadgeProps extends HTMLAttributes<HTMLDivElement>, VariantProps<any> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  status?: 'active' | 'inactive' | 'pending'; // Add the status prop
}
