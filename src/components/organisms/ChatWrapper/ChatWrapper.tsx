import ChatHeader from '../../atoms/ChatHeader/ChatHeader';
import Chat from '../Chat/Chat';
import SendMessageForm from '../SendMessageForm/SendMessageForm';
import classes from './ChatWrapper.module.css';

function ChatWrapper() {
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
