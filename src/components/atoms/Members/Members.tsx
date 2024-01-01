import { useNavigate } from 'react-router-dom';

import { ChatMember } from '../../../models';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { sessionActions } from '../../../store/sessionSlice';
import { logout } from '../../../utils/auth';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import classes from './Members.module.css';

interface Props extends ChatMember {
  active: boolean;
}

function Member(props: Props) {
  return (
    <div
      className={`${classes.member} ${
        props.active && classes['member--active']
      }`}
    >
      <ProfilePicture photoURL={props.photoURL} username={props.username} />
      <div className={classes['member__name']}>{props.username}</div>
    </div>
  );
}

function Members() {
  const members = useAppSelector(state => state.session.members);
  const uid = useAppSelector(state => state.session.credentials?.user.uid);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signOutHandler = () => {
    logout();
    navigate('/');
    dispatch(
      sessionActions.openModal({
        message: 'See you soon!',
        state: 'success',
      }),
    );
  };

  return (
    <div className={classes.members}>
      <section className={classes['members__header']}>
        <span className={classes['members__title']}>Members</span>
      </section>
      <section className={classes['members__description']}>
        <div className={classes['members__description__title']}>
          <i className="fa-solid fa-user-group"></i>&nbsp;&nbsp;MEMBERS (
          {members.length})
        </div>
      </section>
      <section className={classes['members__content']}>
        <section>
          {members.map((member, index) => (
            <Member {...member} key={index} active={member.userId === uid} />
          ))}
        </section>
      </section>
      <section className={classes['members__footer']}>
        <button
          className={classes['members__footer__button']}
          onClick={signOutHandler}
        >
          <i className="fa-solid fa-right-from-bracket"></i>&nbsp;&nbsp;Log out
        </button>
      </section>
    </div>
  );
}

export default Members;
