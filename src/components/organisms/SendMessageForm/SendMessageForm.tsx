import { FormEvent } from 'react';

import { useInput } from '../../../hooks/useInput';
import { LoginFormError } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import { isNotAnEmptyMessage } from '../../../utils';
import classes from './SendMessageForm.module.css';

function SendMessageForm() {
  const { value: messageValue, inputChangeHandler: messageChangeHandler } =
    useInput<string>('', isNotAnEmptyMessage);

  const credentials = useAppSelector(state => state.session.credentials);
  const dispatch = useAppDispatch();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await RealTimeDatabaseService.sendMessageToTeleportChat({
        userId: credentials?.user.uid || '',
        username: credentials?.user.displayName || '',
        message: messageValue,
        photoURL: credentials?.user.photoURL || null,
      });
      messageChangeHandler('');
    } catch (error: unknown) {
      const errorMessage = (error as LoginFormError).message;
      dispatch(
        sessionActions.openModal({
          message: errorMessage,
          state: 'error',
        }),
      );
    }
  };

  return (
    <form className={classes.form} action="POST" onSubmit={submitHandler}>
      <div className={classes['form__input-container']}>
        <input
          className={classes['form__input']}
          type="text"
          name="message"
          id="message"
          value={messageValue}
          onChange={event => messageChangeHandler(event.target.value)}
          placeholder="Write a message..."
        />
      </div>
      <button
        className={`${classes['form__button']} ${
          messageValue.trim().length === 0 && classes['form__button--disabled']
        } `}
        type="submit"
        disabled={messageValue.trim().length === 0}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
    </form>
  );
}

export default SendMessageForm;
