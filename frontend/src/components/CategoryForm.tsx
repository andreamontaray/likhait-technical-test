import { useCategoryForm } from "../hooks/useCategoryForm";
import { CategoryFormData } from "../types";
import { Button, TextField } from "../vibes";

interface CategoryFormProps {
  onSubmit: (data: CategoryFormData) => Promise<void>;
  onCancel: () => void;
  submitLabel?: string;
}

export function CategoryForm({
  onSubmit,
  onCancel,
  submitLabel = "Add Category",
}: CategoryFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useCategoryForm({
    onSubmit,
  });

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const buttonGroupStyle: React.CSSProperties = {
    display: "flex",
    gap: "0.5rem",
    marginTop: "0.5rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <TextField
        label='Name'
        type='text'
        placeholder='Enter category name'
        value={formData.name}
        onChange={(e) => handleChange("name", e.target.value)}
        error={errors.name}
        fullWidth
        required
      />

      {isSuccess && (
        <p style={{ color: "green", margin: 0 }}>
          Category added successfully!
        </p>
      )}

      <div style={buttonGroupStyle}>
        <Button
          type='submit'
          variant='primary'
          disabled={isSubmitting}
          fullWidth
        >
          {isSubmitting ? "Adding..." : submitLabel}
        </Button>
        {onCancel && (
          <Button
            type='button'
            variant='secondary'
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
