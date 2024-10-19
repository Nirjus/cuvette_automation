export const nameValidator = (name) => {
  try {
    if (!name) throw Error("Please provide name");
    if (name.length < 3) throw Error("Name must be 3 character long");
    if (name.length > 20) throw Error("Name must be less than 20 character");
    if (name.startsWith("_"))
      throw Error("name can not be starts with underscore");
    if (name.startsWith("/")) throw Error("Name can not contain slash");
    if (!/^[a-zA-Z0-9_ ]+$/.test(name))
      throw Error("name only contains letters, number and underscore");
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const phoneNumberValidator = (number) => {
  try {
    if (!number) throw Error("Please provide phone number");
    if (number.length < 10 || number.length > 10)
      throw Error("Phone number must be contain 10 digit");
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const emailValidator = (email) => {
  try {
    if (!email) throw Error("Please provide email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw Error("Please enter a valid email address.");
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};

export const employeeSizeValidator = (number) => {
  try {
    if (!number) {
      throw Error("Please enter employee size");
    }
    if (number <= 0) {
      throw Error("Please Enter valid employee number");
    }
    return true;
  } catch (error) {
    throw Error(error.message);
  }
};
