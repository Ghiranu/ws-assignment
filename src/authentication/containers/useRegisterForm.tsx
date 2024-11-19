import React from "react";
import { useState } from "react";
import {
  REGISTER_FORM_FIELD_NAMES,
  NON_EMPTY_FIELD_ERROR_MESSAGE,
  INVALID_EMAIL_ERROR_MESSAGE,
  EMAIL_VALIDATION_REGEX,
  CURRENT_USER_LOCAL_STORAGE_KEY_NAME,
  ROUTES,
} from "../../utils/constants";
import { useNavigate } from "react-router-dom";

const useRegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { FIRST_NAME, LAST_NAME, EMAIL } = REGISTER_FORM_FIELD_NAMES;

  const navigate = useNavigate();

  const checkIfFieldIsEmpty = (
    fields: { fieldName: string; fieldValue: string }[]
  ) => {
    let isFormValid = true;
    fields.forEach((field) => {
      if (field.fieldValue === "") {
        setErrors((previousErrors) => {
          return {
            ...previousErrors,
            [field.fieldName]: NON_EMPTY_FIELD_ERROR_MESSAGE,
          };
        });
        isFormValid = false;
      }
    });

    return isFormValid;
  };

  const handleTriggerEmailValidation = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (
      event.target.name === EMAIL &&
      !EMAIL_VALIDATION_REGEX.test(event.target.value)
    ) {
      setErrors((previousErrors) => {
        return { ...previousErrors, [EMAIL]: INVALID_EMAIL_ERROR_MESSAGE };
      });
    }
    //  else {
    //   setErrors((previousErrors) => {
    //     return { ...previousErrors, [EMAIL]: "" };
    //   });
    // }
  };

  const handleTriggerEmptyField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (event.target.value.length === 0) {
      setErrors((previousErrors) => {
        return {
          ...previousErrors,
          [event.target.name]: NON_EMPTY_FIELD_ERROR_MESSAGE,
        };
      });
    } else {
      setErrors((previousErrors) => {
        return { ...previousErrors, [event.target.name]: "" };
      });
    }
  };

  const handleChangeFieldValue = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    handleTriggerEmptyField(event);
    if (event.target.name === EMAIL) {
      handleTriggerEmailValidation(event);
    }

    setState(event.target.value);
  };

  const handleRegisterUser = () => {
    const isFormValid = checkIfFieldIsEmpty([
      { fieldName: FIRST_NAME, fieldValue: firstName },
      { fieldName: LAST_NAME, fieldValue: lastName },
      { fieldName: EMAIL, fieldValue: email },
    ]);

    if (isFormValid) {
      localStorage.setItem(
        CURRENT_USER_LOCAL_STORAGE_KEY_NAME,
        JSON.stringify({ firstName, lastName, email })
      );
      navigate(ROUTES.TASK);
    }
  };

  return {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    firstName,
    lastName,
    email,
    handleRegisterUser,
    handleChangeFieldValue,
    setFirstName,
    setLastName,
    setEmail,
    errors,
  };
};

export default useRegisterForm;
