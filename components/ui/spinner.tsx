import Box from '@mui/material/Box';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

interface SpinnerProps extends CircularProgressProps {
  variant?: 'determinate' | 'indeterminate';
  showLabel?: boolean;
  value?: number;
}

const Spinner = ({
  variant = 'indeterminate',
  showLabel = false,
  value = 0,
  size = 40,
  color = 'primary',
  thickness = 3.6,
  sx,
  ...props
}: SpinnerProps) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', ...sx }}>
      <CircularProgress
        variant={variant}
        value={variant === 'determinate' ? value : undefined}
        size={size}
        color={color}
        thickness={thickness}
        {...props}
      />

      {variant === 'determinate' && showLabel && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant='caption'
            component='div'
            sx={{ color: 'text.secondary', fontSize: `${Number(size) * 0.25}px` }}
          >{`${Math.round(value)}%`}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Spinner;
