import {
  browserLocalPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";

import { firebaseAuth } from "@/core/persistence/firebase";

import type { UserSession } from "../types";

type AuthStateListener = (session: UserSession | null) => void;
export type AuthMode = "popup" | "redirect";

function toUserSession(user: User | null): UserSession | null {
  if (!user) {
    return null;
  }

  return {
    id: user.uid,
    email: user.email ?? "",
    name: user.displayName ?? "",
  };
}

export class AuthRepository {
  private readonly provider = new GoogleAuthProvider();

  async getSession(): Promise<UserSession | null> {
    await firebaseAuth.authStateReady();
    return toUserSession(firebaseAuth.currentUser);
  }

  observeSession(listener: AuthStateListener): () => void {
    return onAuthStateChanged(firebaseAuth, (user) => {
      listener(toUserSession(user));
    });
  }

  async signInWithGoogle(mode: AuthMode = "redirect"): Promise<void> {
    await setPersistence(firebaseAuth, browserLocalPersistence);

    if (mode === "popup") {
      await signInWithPopup(firebaseAuth, this.provider);
    } else {
      await signInWithRedirect(firebaseAuth, this.provider);
    }
  }

  async signOut(): Promise<void> {
    await firebaseSignOut(firebaseAuth);
  }
}
