import classes from './FileSelector.module.css';

interface Props {
  label: string;
  onChangeFile: (file: File | null) => void;
  hasErrors: boolean;
  errormessage: string;
  fileName?: string;
}

function FileSelector({
  label,
  onChangeFile,
  hasErrors,
  errormessage,
  fileName,
}: Props) {
  let content = (
    <span>
      <i className="fa-solid fa-cloud-arrow-up"></i>&nbsp; Choose a file...
    </span>
  );

  if (fileName) {
    content = <span className={classes['file__name']}>{fileName}</span>;
  }

  return (
    <div style={{ marginBottom: 20 }}>
      <div className={classes['file__label']}>{label}</div>
      <label className={classes.file} htmlFor="file">
        {content}
      </label>
      <input
        className={classes['file__input']}
        type="file"
        name="file"
        id="file"
        accept=".png, .jpg, .jpeg"
        onChange={event =>
          onChangeFile(
            event.target.files === null ? null : event.target.files[0],
          )
        }
      />
      {hasErrors && (
        <span className={classes['file__error']}>{errormessage}</span>
      )}
    </div>
  );
}

export default FileSelector;
