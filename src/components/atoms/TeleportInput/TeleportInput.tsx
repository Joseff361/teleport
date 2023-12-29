import classes from './TeleportInput.module.css';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  style?: React.CSSProperties;
  errormessage?: string;
  haserror?: boolean;
}

function TeleportInput({
  label,
  style,
  errormessage,
  haserror,
  ...props
}: Props) {
  return (
    <div style={style} className={classes['teleport-input']}>
      <label className={classes['teleport-input__label']} htmlFor={props.id}>
        {label}
      </label>
      <input className={classes['teleport-input__input']} {...props} />
      {!!haserror && !!errormessage && (
        <span className={classes['teleport-input__error']}>{errormessage}</span>
      )}
    </div>
  );
}

export default TeleportInput;
