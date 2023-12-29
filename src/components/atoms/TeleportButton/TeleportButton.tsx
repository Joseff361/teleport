import Loader from '../Loader/Loader';
import classes from './TeleportButton.module.css';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

function TeleportButton({ loading, ...props }: Props) {
  return (
    <button
      className={`${classes.button} ${
        (props.disabled || loading) && classes['button--disabled']
      }`}
      {...props}
    >
      {loading ? <Loader size={18} /> : props.label}
    </button>
  );
}

export default TeleportButton;
