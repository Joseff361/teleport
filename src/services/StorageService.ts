import {
  FirebaseStorage,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage';

class StorageService {
  private static storage: FirebaseStorage | null = null;

  private static getStorageInstance(): FirebaseStorage {
    if (this.storage === null) {
      this.storage = getStorage();
    }

    return this.storage;
  }

  public static async uploadImageAndGetDownloadURL(
    fileName: string,
    file: File,
  ): Promise<string> {
    const storageRef = ref(this.getStorageInstance(), fileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  }
}

export default StorageService;
