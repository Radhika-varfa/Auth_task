import { TextField } from "@mui/material";

const FormInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  helperText,
  ...props
}) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error || helperText}
      fullWidth
      margin="normal"
      variant="outlined"
      {...props}
    />
  );
};

export default FormInput;
