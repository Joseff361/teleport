export interface LoginFormFields {
  email: string;
  password: string;
  file: File;
  username: string;
}

export interface LoginFormError {
  code: string;
  message: string;
}

export interface ChatMember {
  userId: string;
  username: string;
  email: string;
  imageUrl: string;
}

export interface ChatMessage {
  userId: string;
  username: string;
  message: string;
}

export interface SendMessageFormFields {
  message: string;
}
