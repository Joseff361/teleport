import { Database, getDatabase, ref, set } from 'firebase/database';
import { ChatMember, ChatMessage } from '../models';
import FirebaseService from './FirebaseService';

const MAIN_CHAT_ID = 'teleport-team-361';

class RealTimeDatabaseService {
  private static db: Database | null = null;

  private static getDatabaseInstance() {
    if (this.db === null) {
      this.db = getDatabase(FirebaseService.getFirebaseAppInstance());
    }

    return this.db;
  }

  public static async addMemberToTeleportChat({
    userId,
    username,
    email,
    photoURL,
  }: ChatMember) {
    const db = this.getDatabaseInstance();

    await set(ref(db, `members/${MAIN_CHAT_ID}/` + userId), {
      username,
      email,
      photoURL,
    });
  }

  public static async sendMessageToTeleportChat({
    userId,
    username,
    message,
    photoURL,
  }: ChatMessage) {
    const db = this.getDatabaseInstance();
    const timestamp = new Date().getTime();

    await set(ref(db, `messages/${MAIN_CHAT_ID}/${timestamp}-${userId}/`), {
      username,
      message,
      timestamp,
      photoURL,
    });
  }

  public static getTeleportChatReference() {
    return ref(this.getDatabaseInstance(), 'messages/' + MAIN_CHAT_ID);
  }

  public static getTeleportMemberReference() {
    return ref(this.getDatabaseInstance(), 'members/' + MAIN_CHAT_ID);
  }
}

export default RealTimeDatabaseService;
