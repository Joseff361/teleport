import { TeleportMessage } from '../../../models';
import { formatMonth } from '../../../utils';
import classes from './DividerDate.module.css';

interface Props {
  messages: TeleportMessage[];
  index: number;
}

function DateItem({ index, messages }: Props) {
  const currentTime = new Date(messages[index].timestamp);

  const parsedDate = `${formatMonth(
    currentTime.getMonth(),
  )} ${currentTime.getDate()}, ${currentTime.getFullYear()}`;

  return (
    <div className={classes['divier-date']}>
      <span className={classes['divier-date__line']}></span>
      <span className={classes['divier-date__date']}>{parsedDate}</span>
    </div>
  );
}

function DividerDate(props: Props) {
  if (props.index === 0) {
    return <DateItem {...props} />;
  } else {
    const currentTime = new Date(props.messages[props.index].timestamp);
    const lastTime = new Date(props.messages[props.index - 1].timestamp);
    const areDifferentDaysOfTheMonth =
      lastTime.getDate() !== currentTime.getDate();
    const areDifferentMonths = lastTime.getMonth() !== currentTime.getMonth();

    if (areDifferentDaysOfTheMonth) {
      return <DateItem {...props} />;
    } else if (areDifferentMonths) {
      return <DateItem {...props} />;
    }

    return <></>;
  }
}

export default DividerDate;
