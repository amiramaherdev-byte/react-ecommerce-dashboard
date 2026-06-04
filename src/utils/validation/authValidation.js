export const validateAuth = (values , isLogin = false) => {
  const errors = {};

  if(!isLogin){

  if (!values.username?.trim()) {
    errors.username = "Username is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!values.email.includes("@")) {
    errors.email = "Invalid email";
  }
  }

  if(isLogin){

    if(!values.identifier?.trim()){
      errors.identifier="UserName or Email is required"
    }


  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Min 6 characters";
  }

  return errors;
};