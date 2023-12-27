import classes from './Input.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

function Input(props: Props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input className={classes.input} {...props} />
    </div>
  );
}

export default Input;
