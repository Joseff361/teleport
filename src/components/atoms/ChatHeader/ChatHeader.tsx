import { onValue } from 'firebase/database';
import { useEffect } from 'react';

import { ChatMember } from '../../../models';
import RealTimeDatabaseService from '../../../services/RealTimeDatabaseService';
import { authSliceActions } from '../../../store/authSlice';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { isValidUser } from '../../../utils/auth';
import classes from './ChatHeader.module.css';

function ChatHeader() {
  const members = useAppSelector(state => state.auth.members);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onValue(RealTimeDatabaseService.getTeleportMemberReference(), snaptshot => {
      const values = snaptshot.val() as Record<string, ChatMember>;
      dispatch(authSliceActions.setMembers(Object.values(values)));
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
