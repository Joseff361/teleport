import { useNavigate } from 'react-router-dom';

import { ChatMember } from '../../../models';
import { useAppSelector } from '../../../store/hooks';
import { logout } from '../../../utils/auth';
import ProfilePicture from '../ProfilePicture/ProfilePicture';
import classes from './Members.module.css';

function Member(props: ChatMember) {
  return (
    <div className={classes.member}>
      <ProfilePicture photoURL={props.photoURL} username={props.username} />
      <div className={classes['member__name']}>{props.username}</div>
    </div>
  );
}

function Members() {
  const members = useAppSelector(state => state.auth.members);
  const navigate = useNavigate();

  const signOutHandler = () => {
    logout();
    navigate('/');
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
            <Member {...member} key={index} />
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
