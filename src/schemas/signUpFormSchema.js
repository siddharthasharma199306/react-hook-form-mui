import { DateTime } from "luxon";
import * as yup from "yup";

const lowerCaseRegex = new RegExp("(?=.*[a-z])");
const upperCaseRegex = new RegExp("(?=.*[A-Z])");

function futureDateValidation(message) {
  return this.test("futureDateValidation", message, function (value) {
    const passedDate = DateTime.fromJSDate(value);
    const { path, createError } = this;
    if (passedDate.isValid) {
      const currentDate = DateTime.now();
      if (passedDate > currentDate) {
        return createError({
          path,
          message: message ?? "Cannot be in future",
        });
      }
    }

    return true;
  });
}
yup.addMethod(yup.date, "futureDateValidation", futureDateValidation);

const signUpFormSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required.")
    .max(15, "Maximum length is 15 characters."),
  middleName: yup
    .string()
    .optional()
    .max(15, "Maximum length is 15 characters."),
  lastName: yup
    .string()
    .required("Last name is required.")
    .max(15, "Maximum length is 15 characters."),
  dateOfBirth: yup
    .date()
    .required()
    .typeError("Invalid date")
    .futureDateValidation("Date of birth cannot be future"),
  email: yup
    .string()
    .required("Email is required.")
    .email("Please enter a valid email"),
  reEnterEmail: yup.string().when("email", {
    is: (val) => val !== null && val !== undefined && val !== "",
    then: (schema) =>
      schema
        .required("Please confirm the email")
        .oneOf([yup.ref("email")], "The email does not match"),
    otherwise: (schema) => schema.optional(),
  }),
  password: yup
    .string()
    .required()
    .min(8, "Password length must be 8 or more")
    .matches(
      lowerCaseRegex,
      "Password should have at least one lower case character"
    )
    .matches(
      upperCaseRegex,
      "Password should have at least one upper case character"
    ),
  reEnterPassword: yup.string().when("password", {
    is: (val) => val !== null && val !== undefined && val !== "",
    then: (schema) =>
      schema
        .required("Please confirm the password")
        .oneOf([yup.ref("password")], "The password does not match"),
    otherwise: (schema) => schema.optional(),
  }),
});

export default signUpFormSchema;
