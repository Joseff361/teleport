import { useNavigate } from 'react-router-dom';

import { logout } from '../../../utils/auth';
import ChatHeader from '../../atoms/ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import classes from './ChatWrapper.module.css';

function ChatWrapper() {
  const navigate = useNavigate();

  const signOutHandler = () => {
    logout();
    navigate('/');
  };

  return (
    <div className={classes.wrapper}>
      <section className={classes['wrapper__header']}>
        <ChatHeader />
      </section>
      <section className={classes['wrapper__body']}>
        <Chat />
      </section>
      <section className={classes['wrapper__footer']}>
        <SendMessageForm />
      </section>
    </div>
  );
}

export default ChatWrapper;
