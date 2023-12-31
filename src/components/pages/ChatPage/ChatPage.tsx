import ChatWrapper from '../../organisms/ChatWrapper/ChatWrapper';
import classes from './ChatPage.module.css';

function ChatPage() {
  return (
    <div className={classes.chat}>
      <section className={classes['chat__messages-list']}></section>
      <section className={classes['chat__main-chat']}>
        <ChatWrapper />
      </section>
      <section className={classes['chat__members']}></section>
    </div>
  );
}

export default ChatPage;
