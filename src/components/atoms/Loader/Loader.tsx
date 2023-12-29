import classes from './Loader.module.css';

interface Props {
  size: number; // Size in pixels
}

function Loader({ size }: Props) {
  const innerSize = size - 2; // 1px of margin * 2
  let border = 8;

  if (size < 70) {
    border = 2;
  }

  return (
    <div className={classes['lds-ring']} style={{ width: size, height: size }}>
      <div
        style={{ width: innerSize, height: innerSize, borderWidth: border }}
      ></div>
      <div
        style={{ width: innerSize, height: innerSize, borderWidth: border }}
      ></div>
      <div
        style={{ width: innerSize, height: innerSize, borderWidth: border }}
      ></div>
      <div
        style={{ width: innerSize, height: innerSize, borderWidth: border }}
      ></div>
    </div>
  );
}

export default Loader;
