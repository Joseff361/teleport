import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import { useInput } from '../../../hooks/useInput';
import AuthenticationService from '../../../services/AuthenticationService';
import { isValidEmail } from '../../../utils';
import { saveCredentials } from '../../../utils/auth';

function SignInForm() {
  const { value: emailValue, inputChangeHandler: emailChangeHandler } =
    useInput<string>('', isValidEmail);

  const { value: passwordValue, inputChangeHandler: passwordChangeHandler } =
    useInput<string>('', isValidEmail);

  const navigate = useNavigate();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await AuthenticationService.signInWithEmailAndPassword(
        emailValue,
        passwordValue,
      );
      saveCredentials(response);
      navigate('/chat');
    } catch (e) {
      alert(e);
    }
  };

  return (
    <form method="POST" onSubmit={submitHandler}>
      <input
        value={emailValue}
        type="email"
        name="email"
        onChange={event => emailChangeHandler(event.target.value)}
      />
      <input
        value={passwordValue}
        type="password"
        name="password"
        onChange={event => passwordChangeHandler(event.target.value)}
      />
      <button type="submit">sign in</button>
    </form>
  );
}

export default SignInForm;
