import { useState } from "react";

import {
  emailValidator,
  passwordValidator,
  firstnameValidator,
  lastnameValidator
} from "../validators.js";

const touchErrors = errors => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };
    return acc;
  }, {});
};

export const useRegisterFormValidator = form => {
  const [errors, setErrors] = useState({
    firstname: {
      dirty: false,
      error: false,
      message: "",
    },
	
	lastname: {
      dirty: false,
      error: false,
      message: "",
    },
	
	email: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    // Create a deep copy of the errors
    let nextErrors = JSON.parse(JSON.stringify(errors));

    // Force validate all the fields
    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { email, password, firstname, lastname } = form;

    if (nextErrors.email.dirty && (field ? field === "email" : true)) {
      const emailMessage = emailValidator(email, form);
      nextErrors.email.error = !!emailMessage;
      nextErrors.email.message = emailMessage;
      if (!!emailMessage) isValid = false;
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;
      if (!!passwordMessage) isValid = false;
    }

    if (nextErrors.firstname.dirty && (field ? field === "firstname" : true)) {
      const firsnameMessage = firstnameValidator(firstname, form);
      nextErrors.firstname.error = !!firsnameMessage;
      nextErrors.firstname.message = firsnameMessage;
      if (!!firsnameMessage) isValid = false;
    }
	  if (nextErrors.lastname.dirty && (field ? field === "lastname" : true)) {
      const lastnameMessage = lastnameValidator(lastname, form);
      nextErrors.lastname.error = !!lastnameMessage;
      nextErrors.lastname.message = lastnameMessage;
      if (!!lastnameMessage) isValid = false;
    }
    

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = e => {
    const field = e.target.name;
    const fieldError = errors[field];
    if (fieldError.dirty) return;

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
