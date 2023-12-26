import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { TeleportMessage } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';

function Chat() {
  const [messages, setMessages] = useState<TeleportMessage[]>([]);

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportChatReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, TeleportMessage>;
      setMessages(Object.values(values));
    });
  }, []);

  return (
    <div>
      {messages.map(message => (
        <div key={message.username + message.timestamp.toString()}>
          <span>{message.message}</span>
          <span>{message.username}</span>
          {!!message.photoURL && (
            <img src={message.photoURL} style={{ width: 40, height: 40 }} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Chat;
