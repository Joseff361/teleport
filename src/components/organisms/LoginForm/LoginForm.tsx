import { FormEvent, useMemo } from 'react';

import {
  fileHasValidExtension,
  hasAtLeastSixCharactersLong,
  hasAtLeastThreeCharactersLong,
  isValidEmail,
} from '../../../utils';
import { useInput } from '../../hooks/useInput';

function LoginForm() {
  const {
    value: usernameValue,
    inputChangeHandler: usernameChangeHandler,
    hasError: usernameHasErrors,
  } = useInput<string>('', hasAtLeastThreeCharactersLong);

  const {
    value: emailValue,
    inputChangeHandler: emailChangeHandler,
    hasError: emailHasErrors,
  } = useInput<string>('', isValidEmail);

  const {
    value: passwordValue,
    inputChangeHandler: paswordChangeHandler,
    hasError: passwordHasErrors,
  } = useInput<string>('', hasAtLeastSixCharactersLong);

  const { inputChangeHandler: fileChangeHandler, hasError: fileHasErrors } =
    useInput<File | null>(null, fileHasValidExtension);

  const disableForm: boolean = useMemo(() => {
    if (
      usernameValue.trim().length === 0 ||
      emailValue.trim().length === 0 ||
      passwordValue.trim().length === 0
    ) {
      return true;
    }

    if (usernameHasErrors || emailHasErrors || passwordHasErrors) {
      return true;
    }

    return false;
  }, [
    usernameValue,
    emailValue,
    passwordValue,
    usernameHasErrors,
    emailHasErrors,
    passwordHasErrors,
  ]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    /*
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
    }*/
  };

  console.log('usernameValue', usernameValue, usernameHasErrors);

  return (
    <form method="POST" onSubmit={submitHandler}>
      <fieldset>
        <legend>Teleport registration</legend>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={usernameValue}
            onChange={event => usernameChangeHandler(event.target.value)}
          />
          {usernameHasErrors && (
            <span>The username must be at least 3 characters long.</span>
          )}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={emailValue}
            onChange={event => emailChangeHandler(event.target.value)}
          />
          {emailHasErrors && <span>Please enter a valid email.</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={passwordValue}
            onChange={event => paswordChangeHandler(event.target.value)}
          />
          {passwordHasErrors && (
            <span>Password must be at least 6 characters long.</span>
          )}
        </div>
        <div>
          <label htmlFor="file">Profile picture</label>
          <input
            type="file"
            name="file"
            id="file"
            accept=".png, .jpg, .jpeg"
            onChange={event =>
              fileChangeHandler(
                event.target.files === null ? null : event.target.files[0],
              )
            }
          />
          {fileHasErrors && (
            <span>Please enter a valid file (png, .jpg, .jpeg).</span>
          )}
        </div>
        <button type="submit" disabled={disableForm}>
          Register
        </button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
