import { FormEvent } from 'react';

import { LoginFormError, LoginFormFields } from '../../../models';
import AuthenticationService from '../../../services/AuthenticationService';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
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

      let downloadURL: string = '';

      try {
        downloadURL = await StorageService.uploadImageAndGetDownloadURL(
          formProps.username,
          formProps.file,
        );
        console.log(downloadURL);

        AuthenticationService.updateProfile(
          user,
          formProps.username,
          downloadURL,
        );
      } catch {
        alert(
          'Successful registration. However, the image could not be attached...',
        );
        return;
      }

      try {
        RealTimeDatabaseService.addMemberToTeleportChat({
          userId: user.uid,
          username: formProps.username,
          email: formProps.email,
          imageUrl: downloadURL,
        });
      } catch {
        alert(
          'Successful registration. However, we could not add you to the chat...',
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
    <form action="POST" onSubmit={submitHandler}>
      <input type="text" name="username" id="username" />
      <input type="email" name="email" id="email" />
      <input type="password" name="password" id="password" />
      <input type="file" name="file" id="file" accept=".png, .jpg, .jpeg" />
      <button type="submit">Register</button>
    </form>
  );
}

export default LoginForm;
