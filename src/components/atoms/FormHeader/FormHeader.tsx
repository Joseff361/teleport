import iconSrc from '../../../assets/icon.png';
import classes from './FormHeader.module.css';

interface Props {
  title: string;
  subtitle: string;
}

function FormHeader({ title, subtitle }: Props) {
  return (
    <div className={classes.header}>
      <img src={iconSrc} className={classes['header__image']} alt="app logo" />
      <h1 className={classes['header__title']}>{title}</h1>
      <span className={classes['header__subtitle']}>{subtitle}</span>
    </div>
  );
}

export default FormHeader;
