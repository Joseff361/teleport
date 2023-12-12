import {
  Auth,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

class AuthenticationService {
  private static auth: Auth | null = null;

  private static getAuthInstance(): Auth {
    if (this.auth === null) {
      this.auth = getAuth();
    }

    return this.auth;
  }

  public static async createUserWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<UserCredential> {
    return await createUserWithEmailAndPassword(
      this.getAuthInstance(),
      email,
      password,
    );
  }
}

export default AuthenticationService;
