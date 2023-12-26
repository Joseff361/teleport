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
  photoURL: string | null | undefined;
}

export interface ChatMessage {
  userId: string;
  username: string;
  message: string;
  photoURL: string | null | undefined;
}

export interface SendMessageFormFields {
  message: string;
}

export interface TeleportMessage {
  message: string;
  timestamp: number;
  username: string;
  photoURL: string | null | undefined;
}
