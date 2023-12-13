import {
  Auth,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
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

  public static async updateProfile(
    user: User,
    displayName: string,
    photoURL: string,
  ) {
    return await updateProfile(user, {
      displayName,
      photoURL,
    });
  }
}

export default AuthenticationService;
