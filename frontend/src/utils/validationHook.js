import { useState } from "react";
import {
  emailValidator,
  employeeSizeValidator,
  nameValidator,
  phoneNumberValidator,
} from "./formValidation";

const useValidation = () => {
  const [error, setError] = useState({
    email: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    employeeSize: "",
  });
  const [value, setValue] = useState({
    email: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    employeeSize: "",
  });

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setValue({ ...value, email: newEmail });
    try {
      emailValidator(newEmail);
      setError({ ...error, email: "" });
    } catch (validationError) {
      setError({ ...error, email: validationError.message });
    }
  };
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setValue({ ...value, name: newName });
    try {
      nameValidator(newName);
      setError({ ...error, name: "" });
    } catch (validationError) {
      setError({ ...error, name: validationError.message });
    }
  };
  const handlecompanyNameChange = (e) => {
    const newName = e.target.value;
    setValue({ ...value, companyName: newName });
    try {
      nameValidator(newName);
      setError({ ...error, companyName: "" });
    } catch (validationError) {
      setError({ ...error, companyName: validationError.message });
    }
  };
  const handlephoneNumberChange = (e) => {
    const newName = e.target.value;
    setValue({ ...value, phoneNumber: newName });
    try {
      phoneNumberValidator(newName);
      setError({ ...error, phoneNumber: null });
    } catch (validationError) {
      setError({ ...error, phoneNumber: validationError.message });
    }
  };
  const handleemployeeSizeChange = (e) => {
    const newName = e.target.value;
    setValue({ ...value, employeeSize: newName });
    try {
      employeeSizeValidator(newName);
      setError({ ...error, employeeSize: null });
    } catch (validationError) {
      setError({ ...error, employeeSize: validationError.message });
    }
  };
  const resetState = (...fields) => {
    setValue((prevState) => {
      const updatedState = { ...prevState };
      fields.forEach((field) => {
        updatedState[field] = "";
      });
      return updatedState;
    });
  };
  return {
    value,
    error,
    handleNameChange,
    handleEmailChange,
    handlecompanyNameChange,
    handlephoneNumberChange,
    handleemployeeSizeChange,
    resetState,
  };
};

export default useValidation;
