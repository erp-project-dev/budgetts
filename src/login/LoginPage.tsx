import { useNavigate } from "react-router-dom";

import { LoginSignIn } from "./components/LoginSignIn";
import { useLogin } from "./hooks/useLogin";

export function LoginPage() {
  const { isSignedIn } = useLogin();
  const navigate = useNavigate();

  if (isSignedIn) {
    navigate("/", { replace: true });
    return;
  }

  return (
    <section className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-linear-to-br from-stone-200 via-stone-100 to-sky-100 px-4 py-10 sm:px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,--theme(--color-sky-300/.35),transparent_30%),radial-gradient(circle_at_bottom_right,--theme(--color-amber-200/.45),transparent_26%)]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-md w-md -translate-x-1/2 -translate-y-1/2 rounded-full border border-stone-200/80 bg-stone-50/50 blur-3xl" />

      <div className="w-full max-w-lg px-6 py-8 sm:px-8 sm:py-10">
        <div className="inline-flex rounded-full border border-stone-800 bg-stone-900 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-100">
          Budgetts
        </div>

        <div className="mt-6 space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
            Tus gastos,
            <br />
            más claros.
          </h1>
          <p className="mt-4 text-lg text-stone-700">
            Inicia sesión para guardar tu presupuesto y sincronizar tus gastos.
          </p>
        </div>

        <LoginSignIn />

        <p className="mt-2 text-xs leading-6 text-stone-500">
          Tu configuración y tus gastos quedan asociados a tu cuenta.
        </p>
      </div>
    </section>
  );
}
