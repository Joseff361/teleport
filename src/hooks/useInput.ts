import { useState } from 'react';

export function useInput<T>(
  defaultValue: T,
  validationFn: (value: T) => boolean,
): {
  value: T;
  inputChangeHandler: (inputValue: T) => void;
  hasError: boolean;
} {
  const [value, setValue] = useState<T>(defaultValue);

  const hasError = !validationFn(value) && value !== defaultValue;

  const inputChangeHandler = (inputValue: T) => {
    setValue(inputValue);
  };

  return {
    value,
    inputChangeHandler,
    hasError,
  };
}
