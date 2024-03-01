"use client";
import FormSubmitButton from "@/components/ui/form-submit-button";
import InputText from "@/components/ui/input-text";
import { register } from "@/service/auth-actions/actions";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function Register() {
  const [state, formAction] = useFormState(register, null);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state));
  }, [state]);

  return (
    <main className="d-flex align-items-center h-100">
      <form className="w-50 m-auto" action={formAction}>
        <h1 className="display-2 text-center">Registrar-se</h1>
        <InputText
          label="Nome"
          name="name"
          placeholder="Seu Nome Aqui"
          type="text"
        ></InputText>
        <InputText
          label="Email"
          name="email"
          placeholder="nome@exemplo.com"
          type="email"
        ></InputText>
        <InputText
          label="Telefone"
          name="phone"
          placeholder="(18) 99999-9999"
          type="phone"
        ></InputText>
        <InputText
          label="Senha"
          name="password"
          placeholder="************"
          type="password"
        ></InputText>
        <InputText
          label="Confirmar Senha"
          name="confirm-password"
          placeholder="************"
          type="password"
        ></InputText>

        <div className="d-grid gap-3 mt-5">
          <div className="d-flex justify-content-end align-items-center gap-2">
            <p>Já possui conta?</p>
            <Link href="/login" className="btn text-primary">
              Logar
            </Link>
          </div>

          <FormSubmitButton>Registrar</FormSubmitButton>
        </div>
      </form>
    </main>
  );
}
