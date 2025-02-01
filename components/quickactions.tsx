// components/properties/quickactions.tsx

/**
 * Interface for the QuickActions component props.
 */
interface QuickActionsProps {
  property: {
    id: string; // Unique identifier for the property
    name: string; // Name of the property
  };
  onEdit?: (id: string) => void; // Callback for the edit action
  onDelete?: (id: string) => void; // Callback for the delete action
  onView?: (id: string) => void; // Callback for the view action
}

/**
 * QuickActions component to display a set of actions for a property.
 */
export function QuickActions({ property, onEdit, onDelete, onView }: QuickActionsProps) {
  return (
    <div className="flex gap-2">
      {/* Edit Action */}
      {onEdit && (
        <button
          onClick={() => onEdit(property.id)}
          className="text-blue-500 hover:text-blue-700 transition-colors"
        >
          Edit
        </button>
      )}

      {/* Delete Action */}
      {onDelete && (
        <button
          onClick={() => onDelete(property.id)}
          className="text-red-500 hover:text-red-700 transition-colors"
        >
          Delete
        </button>
      )}

      {/* View Action */}
      {onView && (
        <button
          onClick={() => onView(property.id)}
          className="text-green-500 hover:text-green-700 transition-colors"
        >
          View
        </button>
      )}
    </div>
  );
}
