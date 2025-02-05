'use client';

import MuiButton, {ButtonProps} from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// Re-export Button for consumption in other modules
export {MuiButton as Button};

export interface LoadingButtonProps extends ButtonProps {
  loading?: boolean;
}

export function LoadingButton({loading, children, ...props}: LoadingButtonProps) {
  return (
    <MuiButton {...props} disabled={loading || props.disabled}>
      {loading ? <CircularProgress size={24} /> : children}
    </MuiButton>
  );
}
