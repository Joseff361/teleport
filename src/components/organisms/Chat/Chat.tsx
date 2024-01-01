import { onValue } from 'firebase/database';
import { Fragment, useEffect } from 'react';

import { TeleportMessage } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import { buildTime } from '../../../utils';
import { isValidMessage } from '../../../utils/auth';
import ProfilePicture from '../../atoms/ProfilePicture/ProfilePicture';
import DividerDate from '../../molecules/DividerDate/DividerDate';
import classes from './Chat.module.css';

function Chat() {
  const messages = useAppSelector(state => state.session.messages);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportChatReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, TeleportMessage>;
      dispatch(sessionActions.setMessages(Object.values(values)));
    });
  }, [dispatch]);

  return (
    <Fragment>
      {messages.filter(isValidMessage).map((message, index) => (
        <Fragment key={message.username + message.timestamp.toString()}>
          <DividerDate index={index} messages={messages} />
          <div className={classes.chat}>
            <ProfilePicture
              photoURL={message.photoURL}
              username={message.username}
            />
            <div className={classes['chat__bubble-container']}>
              <div className={classes['chat__message-container']}>
                <span className={classes['chat__username']}>
                  {message.username}
                </span>
                <span className={classes['chat__time']}>
                  {buildTime(message.timestamp)}
                </span>
              </div>
              <p className={classes['chat__bubble']}>{message.message}</p>
            </div>
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
}

export default Chat;
