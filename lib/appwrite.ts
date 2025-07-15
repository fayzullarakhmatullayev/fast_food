import { CreateUserParams, SignInParams } from '@/type';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  platform: process.env.EXPO_PUBLIC_APPWRITE_PLATFORM,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  userCollectionId: process.env.EXPO_PUBLIC_APPWRITE_USER_COLLECTION_ID
};

export const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint!)
  .setProject(appwriteConfig.projectId!)
  .setPlatform(appwriteConfig.platform!);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({ email, password, name }: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) throw new Error('Failed to create user');

    await signIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      ID.unique(),
      { name, email, accountId: newAccount.$id, avatar: avatarUrl }
    );
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const signIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) throw new Error('Failed to sign in');

    return session;
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession('current');
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    if (!user) throw new Error('Failed to get user');

    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId!,
      appwriteConfig.userCollectionId!,
      Query.equal('accountId', user.$id)
    );

    if (!currentUser) throw new Error('Failed to get current user');

    return currentUser.documents[0];
  } catch (err: any) {
    console.log(err);
    throw new Error(err);
  }
};
