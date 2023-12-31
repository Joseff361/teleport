import { onValue } from 'firebase/database';
import { Fragment, useEffect, useState } from 'react';

import { TeleportMessage } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { isValidMessage } from '../../../utils/auth';
import ProfilePicture from '../../atoms/ProfilePicture/ProfilePicture';
import DividerDate from '../../molecules/DividerDate/DividerDate';
import classes from './Chat.module.css';

function Chat() {
  const [messages, setMessages] = useState<TeleportMessage[]>([]);

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportChatReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, TeleportMessage>;
      setMessages(Object.values(values));
    });
  }, []);

  const buildTime = (value: number): string => {
    const date = new Date(value);

    let hours = date.getHours().toString();
    let minutes = date.getMinutes().toString();

    if (date.getHours().toString().length === 1) {
      hours = `0${date.getHours()}`;
    }

    if (date.getMinutes().toString().length === 1) {
      minutes = `0${date.getMinutes()}`;
    }

    return `${hours}:${minutes}`;
  };

  return (
    <Fragment>
      {messages.filter(isValidMessage).map((message, index) => (
        <Fragment>
          <DividerDate index={index} messages={messages} />
          <div
            className={classes.chat}
            key={message.username + message.timestamp.toString()}
          >
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
