import { FormEvent, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../../hooks/useInput';
import { LoginFormError } from '../../../models';
import AuthenticationService from '../../../services/AuthenticationService';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import StorageService from '../../../services/StorageService';
import {
  fileHasValidExtension,
  hasAtLeastSixCharactersLong,
  hasAtLeastThreeCharactersLong,
  isValidEmail,
} from '../../../utils';
import { saveCredentials } from '../../../utils/auth';

function SignUpForm() {
  const navigate = useNavigate();

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

  const {
    value: fileValue,
    inputChangeHandler: fileChangeHandler,
    hasError: fileHasErrors,
  } = useInput<File | null>(null, fileHasValidExtension);

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

    try {
      const { user } =
        await AuthenticationService.createUserWithEmailAndPassword(
          emailValue,
          passwordValue,
        );

      let downloadURL: string = '';

      if (fileValue) {
        try {
          downloadURL = await StorageService.uploadImageAndGetDownloadURL(
            usernameValue,
            fileValue,
          );

          AuthenticationService.updateProfile(user, usernameValue, downloadURL);
        } catch {
          alert('The image could not be attached...');
        }
      }

      try {
        RealTimeDatabaseService.addMemberToTeleportChat({
          userId: user.uid,
          username: usernameValue,
          email: emailValue,
          photoURL: downloadURL,
        });
      } catch {
        alert('We could not add you to the chat...');
        return;
      }

      const credentials =
        await AuthenticationService.signInWithEmailAndPassword(
          emailValue,
          passwordValue,
        );

      alert('Successful registration!');
      saveCredentials(credentials);
      navigate('/chat');
    } catch (error: unknown) {
      const errorCode = (error as LoginFormError).code;
      const errorMessage = (error as LoginFormError).message;
      alert(errorMessage + errorCode);
    }
  };

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

export default SignUpForm;
