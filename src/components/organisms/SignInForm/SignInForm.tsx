import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../../hooks/useInput';
import AuthenticationService from '../../../services/AuthenticationService';
import { useAppDispatch } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import { hasAtLeastSixCharactersLong, isValidEmail } from '../../../utils';
import { saveCredentials } from '../../../utils/auth';
import TeleportButton from '../../atoms/TeleportButton/TeleportButton';
import TeleportInput from '../../atoms/TeleportInput/TeleportInput';
import classes from './SignInForm.module.css';

function SignInForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    value: emailValue,
    hasError: emailHasErrors,
    inputChangeHandler: emailChangeHandler,
  } = useInput<string>('', isValidEmail);

  const {
    value: passwordValue,
    hasError: passwordHasErrors,
    inputChangeHandler: passwordChangeHandler,
  } = useInput<string>('', hasAtLeastSixCharactersLong);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await AuthenticationService.signInWithEmailAndPassword(
        emailValue,
        passwordValue,
      );
      saveCredentials(response);
      navigate('/chat');
      dispatch(
        sessionActions.openModal({
          message: `Successful login. Welcome!`,
          state: 'success',
        }),
      );
    } catch (e) {
      dispatch(
        sessionActions.openModal({
          message: 'There was an error logging in.',
          state: 'error',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const disabledForm =
    passwordValue.trim().length === 0 ||
    emailValue.trim().length === 0 ||
    emailHasErrors ||
    passwordHasErrors;

  return (
    <form method="POST" onSubmit={submitHandler}>
      <TeleportInput
        label="Email"
        value={emailValue}
        type="email"
        name="email"
        id="email"
        placeholder="email@acme.com"
        onChange={event => emailChangeHandler(event.target.value)}
        errormessage="Please enter a valid email."
        haserror={emailHasErrors}
      />
      <TeleportInput
        label="Password"
        value={passwordValue}
        type="password"
        name="password"
        id="password"
        placeholder="password"
        onChange={event => passwordChangeHandler(event.target.value)}
        errormessage="Password must be at least 6 characters long."
        haserror={passwordHasErrors}
      />
      <TeleportButton
        loading={loading}
        type="submit"
        label="Sign in"
        disabled={disabledForm}
      />
      <div className={classes['signin__text']}>
        Don't have an account?{' '}
        <span onClick={() => navigate('signup')}>Sign up</span>
      </div>
    </form>
  );
}

export default SignInForm;
