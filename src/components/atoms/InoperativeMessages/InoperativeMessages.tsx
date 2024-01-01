import icon from '../../../assets/icon.png';
import profile1 from '../../../assets/profile1.jpg';
import profile2 from '../../../assets/profile2.jpg';
import profile3 from '../../../assets/profile3.jpg';
import profile4 from '../../../assets/profile4.jpg';
import profile5 from '../../../assets/profile5.jpg';
import { useAppSelector } from '../../../store/hooks';
import { buildTime } from '../../../utils';

import classes from './InoperativeMessages.module.css';

interface Props {
  name: string;
  time: string;
  message: string;
  profilePicture: string;
  active?: boolean;
}

const profiles: Props[] = [
  {
    name: 'Gary Hughes',
    time: '16:30',
    message: 'Wow really cool',
    profilePicture: profile1,
  },
  {
    name: 'Claudia Maudi',
    time: '08:24',
    message: 'publish now!',
    profilePicture: profile2,
  },
  {
    name: 'Mauricio Hernandez',
    time: '09:12',
    message: 'Have a great working week!',
    profilePicture: profile3,
  },
  {
    name: 'Brenda Fernandez',
    time: '12:01',
    message: 'What do you think?',
    profilePicture: profile4,
  },
  {
    name: 'Camila Andrade',
    time: 'yesterday',
    message: 'Awesome!',
    profilePicture: profile5,
  },
];

function InoperativeMessage(props: Props) {
  let message = props.message;

  if (message.length > 25) {
    message = `${message.slice(0, 26).trim()}...`;
  }

  return (
    <li
      className={`${classes.message} ${
        props.active && classes['message--active']
      }`}
    >
      <div className={classes['message__image-container']}>
        <img
          className={classes['message__image']}
          src={props.profilePicture}
          alt="profile picture"
        />
      </div>
      <div className={classes['message__info']}>
        <div className={classes['message__info__description']}>
          <span className={classes['message__info__description__name']}>
            {props.name}
          </span>
          <div className={classes['message__info__description__time']}>
            {props.time}
          </div>
        </div>
        <div className={classes['message__info__message']}>{message}</div>
      </div>
    </li>
  );
}

function InoperativeMessages() {
  const messages = useAppSelector(state => state.auth.messages);
  const message = [...messages].pop();

  const lastMessage = `${message?.username} · ${message?.message}`;

  return (
    <div className={classes.inoperative}>
      <section className={classes['inoperative__header']}>
        <span className={classes['inoperative__title']}>Mesages</span>
      </section>
      <section>
        {profiles.slice(0, 2).map((profile, index) => (
          <InoperativeMessage {...profile} key={index} />
        ))}
        {message && (
          <InoperativeMessage
            name={message.username}
            time={buildTime(message.timestamp)}
            message={lastMessage}
            profilePicture={icon}
            active={true}
          />
        )}
        {profiles.slice(2, 5).map((profile, index) => (
          <InoperativeMessage {...profile} key={index} />
        ))}
      </section>
    </div>
  );
}

export default InoperativeMessages;
