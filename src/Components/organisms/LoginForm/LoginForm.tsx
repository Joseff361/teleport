import { FormEvent } from 'react';

import { LoginFormError, LoginFormFields } from '../../../models';
import AuthenticationService from '../../../services/AuthenticationService';

function LoginForm() {
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(
      event.target as unknown as HTMLFormElement | undefined,
    );
    const formProps = Object.fromEntries(
      formData,
    ) as unknown as LoginFormFields;
    console.log(formProps);

    try {
      const credentiaals =
        await AuthenticationService.createUserWithEmailAndPassword(
          formProps.email,
          formProps.password,
        );
      console.log(credentiaals);
    } catch (error: unknown) {
      const errorCode = (error as LoginFormError).code;
      const errorMessage = (error as LoginFormError).message;
      alert(errorMessage + errorCode);
    }
  };

  return (
    <form onSubmit={submitHandler}>
      <input type="email" name="email" id="email" />
      <input type="password" name="password" id="password" />
      <input type="file" name="file" id="file" />
      <button>Register</button>
    </form>
  );
}

export default LoginForm;
