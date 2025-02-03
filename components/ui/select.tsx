'use client';

import {cn} from '@/lib/utils';
import type {SelectProps as MuiSelectProps} from '@mui/material';
import {FormControl, MenuItem, Select as MuiSelect, styled} from '@mui/material';
import {Icon} from 'components/ui/icon';
import * as React from 'react';

const StyledSelect = styled(MuiSelect)(({theme}) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.12)',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: 'rgba(0, 0, 0, 0.24)',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiSelect-icon': {
    color: 'rgba(0, 0, 0, 0.54)',
  },
}));

export interface SelectProps extends Omit<MuiSelectProps, 'variant'> {
  placeholder?: string;
}

const Select = React.memo(
  React.forwardRef<HTMLSelectElement, SelectProps>(
    ({className, children, placeholder, ...props}, ref) => (
      <FormControl fullWidth>
        <StyledSelect
          ref={ref}
          className={cn(
            'rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          displayEmpty
          IconComponent={() => <Icon name='chevron-down' className='w-5 h-5' />}
          {...props}
        >
          {placeholder && (
            <MenuItem value='' disabled>
              {placeholder}
            </MenuItem>
          )}
          {children}
        </StyledSelect>
      </FormControl>
    ),
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.value === nextProps.value &&
      prevProps.className === nextProps.className &&
      prevProps.disabled === nextProps.disabled &&
      prevProps.placeholder === nextProps.placeholder
    );
  },
);

Select.displayName = 'Select';

const SelectItem = React.forwardRef<HTMLLIElement, React.ComponentProps<typeof MenuItem>>(
  ({className, children, ...props}, ref) => (
    <MenuItem
      ref={ref}
      className={cn(
        'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </MenuItem>
  ),
);
SelectItem.displayName = 'SelectItem';

export {Select, SelectItem};

export default Select;
