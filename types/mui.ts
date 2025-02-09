import { ButtonProps, DialogProps as MuiDialogProps } from '@mui/material';

export interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: ButtonProps['variant'];
  onSubscribe?: () => void;
  recommended?: boolean;
}

export interface DialogProps extends MuiDialogProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  footer?: React.ReactNode;
}
