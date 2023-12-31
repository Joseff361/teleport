import { FormEvent } from 'react';

const months = [
  'Jan.',
  'Feb.',
  'Mar.',
  'Apr.',
  'May',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sept.',
  'Oct.',
  'Nov.',
  'Dec.',
];

export const buildFormObjectFromEvent = <T>(
  formEvent: FormEvent<HTMLFormElement>,
): T => {
  const iterableForm = new FormData(formEvent.target as HTMLFormElement);
  return Object.fromEntries(iterableForm) as T;
};

export const isValidEmail = (value: string) => {
  return /^\S+@\S+\.\S+$/.test(value);
};

export const hasAtLeastThreeCharactersLong = (value: string) => {
  return value.trim().length > 2;
};

export const hasAtLeastSixCharactersLong = (value: string) => {
  return value.trim().length > 5;
};

export const fileHasValidExtension = (value: File | null) => {
  return (
    !!value && ['image/png', 'image/jpg', 'image/jpeg'].includes(value.type)
  );
};

export const isNotAnEmptyMessage = (value: string) => {
  return value.trim().length > 0;
};

export const formatMonth = (index: number) => {
  return months[index] || '';
};
