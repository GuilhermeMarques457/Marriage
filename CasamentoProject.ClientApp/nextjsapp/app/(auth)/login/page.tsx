"use client";
import FormSubmitButton from "@/components/ui/form-submit-button";
import InputText from "@/components/ui/input-text";
import { login } from "@/service/auth-actions/actions";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function Login() {
  const [state, formAction] = useFormState(login, null);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <main className="d-flex align-items-center h-100">
      <form className="w-50 m-auto" action={formAction}>
        <h1 className="display-2 text-center">Login</h1>
        <InputText
          label="Email"
          name="email"
          placeholder="nome@exemplo.com"
          type="email"
        ></InputText>
        <InputText
          label="Senha"
          name="password"
          placeholder="************"
          type="password"
        ></InputText>

        <div className="d-grid gap-3 mt-5">
          <div className="d-flex justify-content-end align-items-center gap-2">
            <p>Não possui conta?</p>
            <Link href="/register" className="btn text-primary">
              Cadastrar-se
            </Link>
          </div>

          <FormSubmitButton>Logar</FormSubmitButton>
        </div>
      </form>
    </main>
  );
}
