import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/components/form/Button";

import { useLogin } from "../hooks/useLogin";

export function LoginSignIn() {
  const { signIn } = useLogin();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    await signIn();
    navigate("/");
  };

  return (
    <div className="mt-6">
      <Button type="button" fullWidth onClick={handleSignIn}>
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-stone-900 shadow-sm shadow-stone-900/10">
          G
        </span>
        <span className="flex-1 text-center">Continuar con Google</span>
        <span className="text-lg" aria-hidden>
          →
        </span>
      </Button>
    </div>
  );
}
