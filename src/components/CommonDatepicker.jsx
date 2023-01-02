import { FormHelperText } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import { useController } from "react-hook-form";

const CommonDatepicker = ({
  name,
  control,
  onChangeHandler,
  onBlurHandler,
  disabled,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
  });
  console.log("errors", errors);
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <Stack spacing={3}>
        <DesktopDatePicker
          disabled={disabled}
          inputFormat="MM/dd/yyyy"
          onChange={(event) => {
            console.log("event", event);
            field.onChange(event);
            onChangeHandler(event);
          }} // send value to hook form
          onBlur={(event) => {
            field.onBlur(event);
            onBlurHandler(event);
          }} // notify when input is touched/blur
          value={field.value || null} // input value
          name={field.name} // send down the input name
          inputRef={field.ref} // send input ref, so we can focus on input when error appear
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
      {errors[name] ? (
        <FormHelperText error={errors[name] ? true : false}>
          {errors[name]?.message}
        </FormHelperText>
      ) : null}
    </LocalizationProvider>
  );
};

export default CommonDatepicker;

CommonDatepicker.defaultProps = {
  onChangeHandler: () => {},
  onBlurHandler: () => {},
  inputProps: {},

  disabled: false,
};
