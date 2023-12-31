import { FormEvent, useMemo, useState } from 'react';
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
import TeleportButton from '../../atoms/TeleportButton/TeleportButton';
import TeleportInput from '../../atoms/TeleportInput/TeleportInput';
import FileSelector from '../../molecules/FileSelector/FileSelector';
import classes from './SignUpForm.module.css';

function SignUpForm() {
  const [loading, setLoading] = useState<boolean>(false);
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

    if (fileValue && !fileHasValidExtension(fileValue)) {
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
    fileValue,
  ]);

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { user } =
        await AuthenticationService.createUserWithEmailAndPassword(
          emailValue,
          passwordValue,
        );

      let downloadURL: string = '';

      try {
        if (fileValue) {
          downloadURL = await StorageService.uploadImageAndGetDownloadURL(
            usernameValue,
            fileValue,
          );
        }

        AuthenticationService.updateProfile(user, usernameValue, downloadURL);
      } catch {
        alert('The image could not be attached...');
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <form method="POST" onSubmit={submitHandler}>
      <TeleportInput
        label="Username *"
        value={usernameValue}
        type="text"
        name="username"
        id="username"
        placeholder="Username"
        onChange={event => usernameChangeHandler(event.target.value)}
        errormessage="The username must be at least 3 characters long."
        haserror={usernameHasErrors}
      />
      <TeleportInput
        label="Email *"
        value={emailValue}
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        onChange={event => emailChangeHandler(event.target.value)}
        errormessage="Please enter a valid email."
        haserror={emailHasErrors}
      />
      <TeleportInput
        label="Password *"
        value={passwordValue}
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={event => paswordChangeHandler(event.target.value)}
        errormessage="Password must be at least 6 characters long."
        haserror={passwordHasErrors}
      />
      <FileSelector
        label="Profile picture"
        onChangeFile={fileChangeHandler}
        hasErrors={fileHasErrors}
        errormessage="Please enter a valid file (png, .jpg, .jpeg)."
        fileName={fileValue?.name}
      />
      <TeleportButton
        loading={loading}
        type="submit"
        label="Register"
        disabled={disableForm}
      />
      {!loading && (
        <div className={classes['signup__text']}>
          <span onClick={() => navigate('signin')}>Back</span>
        </div>
      )}
    </form>
  );
}

export default SignUpForm;
