export interface LoginContextValue {
  isSignedIn: boolean;
  signIn: () => Promise<void>;
}
