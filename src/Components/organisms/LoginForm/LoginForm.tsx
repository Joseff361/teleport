import { FormEvent } from 'react';

import { LoginFormError, LoginFormFields } from '../../../models';
import AuthenticationService from '../../../services/AuthenticationService';
import StorageService from '../../../services/StorageService';

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
      const { user } =
        await AuthenticationService.createUserWithEmailAndPassword(
          formProps.email,
          formProps.password,
        );

      console.log(user);
      try {
        const downloadURL = await StorageService.uploadImageAndGetDownloadURL(
          'displayName',
          formProps.file,
        );
        console.log(downloadURL);

        AuthenticationService.updateProfile(user, 'displayName', downloadURL);
      } catch {
        alert(
          'Successful registration. However, the image could not be attached...',
        );
        return;
      }

      alert('Successful registration!');
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
      <input type="file" name="file" id="file" accept=".png, .jpg, .jpeg" />
      <button>Register</button>
    </form>
  );
}

export default LoginForm;
