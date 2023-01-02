import { TextField, FormHelperText } from "@mui/material";
import React, { Fragment } from "react";
import { useController } from "react-hook-form";

const Input = ({
  control,
  name,
  onChangeHandler,
  onBlurHandler,
  inputProps,
  type,
  disabled,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });

  return (
    <Fragment>
      <TextField
        disabled={disabled}
        type={type}
        fullWidth
        onChange={(event) => {
          field.onChange(event);
          onChangeHandler(event);
        }} // send value to hook form
        onBlur={(event) => {
          field.onBlur(event);
          onBlurHandler(event);
        }} // notify when input is touched/blur
        value={field.value || ""} // input value
        name={field.name} // send down the input name
        inputRef={field.ref} // send input ref, so we can focus on input when error appear
        inputProps={inputProps}
        InputLabelProps={{ variant: "outlined", shrink: true }}
      />
      {errors[name] ? (
        <FormHelperText error={errors[name] ? true : false}>
          {errors[name]?.message}
        </FormHelperText>
      ) : null}
    </Fragment>
  );
};

export default Input;

Input.defaultProps = {
  onChangeHandler: () => {},
  onBlurHandler: () => {},
  inputProps: {},
  type: "string",
  disabled: false,
};
