import { onValue } from 'firebase/database';
import { useEffect, useState } from 'react';

import { ChatMember } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { isValidUser } from '../../../utils/auth';
import classes from './ChatHeader.module.css';

function ChatHeader() {
  const [members, setMembers] = useState<ChatMember[]>([]);

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportMemberReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, ChatMember>;
      setMembers(Object.values(values));
    });
  }, []);

  const membersCount = members.filter(isValidUser).length;

  return (
    <div className={classes.header}>
      <span className={classes['header__image']}></span>
      <div>
        <div className={classes['header__title']}>Teleport Team</div>
        <span>{membersCount} members</span>
      </div>
    </div>
  );
}

export default ChatHeader;
