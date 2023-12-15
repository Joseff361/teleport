import { FormEvent } from 'react';

import { LoginFormError, SendMessageFormFields } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';

function Chat() {
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(
      event.target as unknown as HTMLFormElement | undefined,
    );

    const formProps = Object.fromEntries(
      formData,
    ) as unknown as SendMessageFormFields;
    console.log(formProps);

    try {
      await RealTimeDatabaseService.sendMessageToTeleportChat({
        userId: 'mx8CQ8rRDyP9leU3axrlWT59ERf2',
        username: 'Joseff',
        message: 'Hello world2!',
      });
    } catch (error: unknown) {
      const errorCode = (error as LoginFormError).code;
      const errorMessage = (error as LoginFormError).message;
      alert(errorMessage + errorCode);
    }
  };

  return (
    <form action="POST" onSubmit={submitHandler}>
      <input type="text" name="message" id="v" />
      <button type="submit">Send</button>
    </form>
  );
}

export default Chat;
