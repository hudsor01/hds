'use client';

import {cn} from '../../app/lib/utils';
import {Dialog, DialogContent} from '@mui/material';
import * as React from 'react';
import {X} from 'react-feather';

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined);

function useSheet() {
  const context = React.useContext(SheetContext);
  if (!context) {
    throw new Error('Sheet components must be used within a Sheet');
  }
  return context;
}

interface SheetProps extends Omit<React.ComponentProps<typeof Dialog>, 'open'> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const Sheet = React.forwardRef<HTMLDivElement, SheetProps>(
  ({children, open = false, onOpenChange, onClose, side = 'right', ...props}, ref) => {
    const [isOpen, setIsOpen] = React.useState(open);

    React.useEffect(() => {
      setIsOpen(open);
    }, [open]);

    const handleClose = React.useCallback(
      (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
        onClose?.(event, reason);
        onOpenChange?.(false);
        setIsOpen(false);
      },
      [onClose, onOpenChange],
    );

    return (
      <SheetContext.Provider
        value={{
          open: isOpen,
          onOpenChange: o => {
            setIsOpen(o);
            onOpenChange?.(o);
          },
        }}
      >
        <Dialog
          ref={ref}
          open={isOpen}
          onClose={handleClose}
          {...props}
          PaperProps={{
            sx: {
              position: 'fixed',
              [side]: 0,
              top: 0,
              bottom: 0,
              width: side === 'left' || side === 'right' ? 'auto' : '100%',
              height: side === 'top' || side === 'bottom' ? 'auto' : '100%',
              m: 0,
              maxHeight: '100vh',
              borderRadius: 0,
            },
          }}
        >
          {children}
        </Dialog>
      </SheetContext.Provider>
    );
  },
);
Sheet.displayName = 'Sheet';

const SheetTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({children, ...props}, ref) => {
  const {onOpenChange} = useSheet();
  return (
    <button type='button' ref={ref} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </button>
  );
});
SheetTrigger.displayName = 'SheetTrigger';

const SheetClose = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({className, onClick, ...props}, ref) => {
  const {onOpenChange} = useSheet();
  return (
    <button
      ref={ref}
      type='button'
      className={cn(
        'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none',
        className,
      )}
      onClick={e => {
        onClick?.(e);
        onOpenChange(false);
      }}
      {...props}
    >
      <X className='h-4 w-4' />
    </button>
  );
});
SheetClose.displayName = 'SheetClose';

const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof DialogContent> & {position?: 'left' | 'right' | 'top' | 'bottom'}
>(({children, className, position = 'right', ...props}, ref) => (
  <DialogContent
    ref={ref}
    className={cn('relative p-6', className)}
    sx={{
      position: 'fixed',
      [position]: 0,
      top: 0,
      bottom: 0,
      width: position === 'left' || position === 'right' ? 'auto' : '100%',
      height: position === 'top' || position === 'bottom' ? 'auto' : '100%',
      m: 0,
      maxHeight: '100vh',
      borderRadius: 0,
    }}
    {...props}
  >
    <SheetClose />
    {children}
  </DialogContent>
));
SheetContent.displayName = 'SheetContent';

const SheetHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-2 text-center sm:text-left', className)}
      {...props}
    />
  ),
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)}
      {...props}
    />
  ),
);
SheetFooter.displayName = 'SheetFooter';

const SheetTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({className, ...props}, ref) => (
    <h3 ref={ref} className={cn('text-lg font-semibold text-foreground', className)} {...props} />
  ),
);
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({className, ...props}, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
SheetDescription.displayName = 'SheetDescription';

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
