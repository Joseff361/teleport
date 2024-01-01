import { onValue } from 'firebase/database';
import { useEffect } from 'react';

import { ChatMember } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import { isValidUser } from '../../../utils/auth';
import classes from './ChatHeader.module.css';

function ChatHeader() {
  const members = useAppSelector(state => state.session.members);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportMemberReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, ChatMember>;
      const membersIds = Object.keys(values);

      const members = Object.values(values).map((member, index) => {
        return {
          ...member,
          userId: membersIds[index],
        };
      });
      dispatch(sessionActions.setMembers(members));
    });
  }, [dispatch]);

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
