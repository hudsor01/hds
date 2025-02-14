# Type System

This directory contains the type definitions for the application. All types are consolidated in `types.ts` and organized into logical namespaces for better organization and discoverability.

## Usage

Import types from the root types export:

```typescript
import { Auth, UI, Forms, Hooks } from '@/types'

// Use namespaced types
const user: Auth.User = {
  id: '123',
  email: 'user@example.com'
}

// Component props
interface MyComponentProps extends UI.ComponentProps {
  title: string
}

// Hook usage
const { showToast }: Hooks.UseToastReturn = useToast()
```

## Available Namespaces

- `Auth` - Authentication and user account types
- `UI` - Component and styling related types
- `Forms` - Form handling and validation types
- `Hooks` - Custom hook return types
- `Animations` - Animation system types
- `Properties` - Property management types
- `Payments` - Payment processing types
- `Analytics` - Analytics and tracking types
- `Validation` - Form validation types
- `Services` - Service layer types
- `States` - Common state management types
- `Network` - API and networking types

## Utility Types

Common utility types are available directly from the root export:

```typescript
import { WithChildren, WithClassName, Nullable, Optional } from '@/types'

interface Props extends WithChildren, WithClassName {
  data: Nullable<string>
  config?: Optional<Config>
}
```

## Best Practices

1. Always import from '@/types' rather than deep importing
2. Use namespaces to organize related types
3. Prefer interface extension over type intersection where possible
4. Use JSDoc comments for complex types that need documentation
