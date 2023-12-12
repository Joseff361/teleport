export interface LoginFormFields {
  email: string;
  password: string;
  file: File;
}

export interface LoginFormError {
  code: string;
  message: string;
}
