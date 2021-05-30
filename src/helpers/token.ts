
import { Auth } from 'aws-amplify';
export interface ItokenObject {
  token?: string;
  userId?: string;
  email?: string;
  error?: Error;
}

export async function getToken(): Promise<ItokenObject> {
  try {
    const session = await Auth.currentSession();
    return {
      token: session.getIdToken().getJwtToken(),
      userId: session.getIdToken().payload.userId,
      email: session.getIdToken().payload.email,
    }
  } catch (error) {
    return {
      error,
    }
  }
}
