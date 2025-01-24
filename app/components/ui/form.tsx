'use client';

import { cn } from "@/auth/lib/utils";
import { Box, FormHelperText, InputLabel, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import type { JSX } from 'react';
import * as React from "react";
import { Loader } from 'react-feather';
import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
    FormProvider,
    FormProviderProps,
    useFormContext,
    useFormState
} from "react-hook-form";

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState, control } = useFormContext();
  const fieldState = getFieldState(fieldContext.name, formState);
  const { isSubmitting } = useFormState({ control });

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    isSubmitting,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const StyledFormItem = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  '& .MuiFormControl-root': {
    width: '100%'
  }
}));

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Box> & {
    orientation?: "vertical" | "horizontal";
  }
>(({ className, orientation = "vertical", ...props }, ref) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={{ id }}>
      <StyledFormItem
        ref={ref}
        className={cn(
          orientation === "horizontal" && "flex items-center gap-4",
          className
        )}
        {...props}
      />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  HTMLLabelElement,
  React.ComponentProps<typeof InputLabel> & {
    required?: boolean;
    optional?: boolean;
  }
>(({ className, required, optional, ...props }, ref) => {
  const { error, formItemId, isSubmitting } = useFormField();
  return (
    <InputLabel
      ref={ref}
      htmlFor={formItemId}
      className={cn(
        error && "text-error",
        isSubmitting && "opacity-50",
        className
      )}
      {...props}
    >
      {props.children}
      {required && <span className="text-error ml-1">*</span>}
      {optional && (
        <span className="text-gray-500 ml-1 text-sm">(optional)</span>
      )}
    </InputLabel>
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof TextField> & {
    isLoading?: boolean;
  }
>(({ children, isLoading, disabled, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId, isSubmitting } =
    useFormField();

  return (
    <div className="relative">
      <TextField
        ref={ref}
        id={formItemId}
        error={!!error}
        disabled={isSubmitting || disabled}
        helperText={error?.message}
        fullWidth
        {...props}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader className="h-4 w-4 animate-spin text-gray-400" />
        </div>
      )}
    </div>
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();
  return (
    <FormHelperText
      ref={ref}
      id={formDescriptionId}
      className={cn(
        "text-sm text-gray-500 transition-opacity",
        className
      )}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    renderError?: (error: string) => React.ReactNode;
  }
>(({ className, children, renderError, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error?.message ? String(error.message) : children;

  if (!body) return null;

  return (
    <Typography
      ref={ref}
      color="error"
      variant="body2"
      id={formMessageId}
      className={cn("animate-in fade-in", className)}
      {...props}
    >
      {renderError ? renderError(String(body)) : body}
    </Typography>
  );
});
FormMessage.displayName = "FormMessage";

const FormSubmitButton = styled('button')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  '&:disabled': {
    opacity: 0.7,
    cursor: 'not-allowed'
  }
}));

const Form = FormProvider as <TFieldValues extends FieldValues>(
  props: FormProviderProps<TFieldValues>
) => JSX.Element;

export {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormSubmitButton,
    useFormField
};
