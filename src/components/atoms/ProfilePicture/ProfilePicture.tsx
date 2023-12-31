import classes from './ProfilePicture.module.css';

interface Props {
  photoURL: string | null | undefined;
  username: string;
}

function ProfilePicture({ photoURL, username }: Props) {
  if (photoURL) {
    return (
      <div
        className={classes.image}
        style={{ backgroundImage: `url(${photoURL})` }}
      ></div>
    );
  }

  const initials = username
    .split(' ')
    .map(u => u.at(0) || '')
    .slice(0, 2)
    .join('')
    .toUpperCase()
    .trim();

  return <div className={classes.image}>{initials}</div>;
}

export default ProfilePicture;
