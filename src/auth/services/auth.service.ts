import { type AuthMode, AuthRepository } from "../repositories/auth.repository";
import type { UserSession } from "../types";

type AuthStateListener = (session: UserSession | null) => void;

export class AuthService {
  private readonly repository: AuthRepository;

  constructor({ authRepository }: { authRepository: AuthRepository }) {
    this.repository = authRepository;
  }

  getSession(): Promise<UserSession | null> {
    return this.repository.getSession();
  }

  observeSession(listener: AuthStateListener): () => void {
    return this.repository.observeSession(listener);
  }

  signInWithGoogle(mode: AuthMode): Promise<void> {
    return this.repository.signInWithGoogle(mode);
  }

  signOut(): Promise<void> {
    return this.repository.signOut();
  }
}
