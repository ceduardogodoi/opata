"use client";

import { createUserInputSchema } from "@/app/use-cases/users/sign-up/sign-up.dto";
import { useState, type FormEvent, type JSX } from "react";

type FormErrorState = {
  fullName?: string[];
  email?: string[];
  username?: string[];
  password?: string[];
};

const INITIAL_STATE = {};

export default function SignUpPage(): JSX.Element {
  const [formErrorState, setFormErrorState] =
    useState<FormErrorState>(INITIAL_STATE);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const entries = new FormData(event.currentTarget);
    const data = Object.fromEntries(entries);

    const result = createUserInputSchema.safeParse(data);
    if (!result.success) {
      setFormErrorState(result.error.formErrors.fieldErrors);

      return;
    }
  }

  return (
    <div>
      <h1>Criar nova conta</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="fullName">Nome completo</label>
        <input
          id="fullName"
          name="fullName"
          type="text"
          placeholder="Seu nome completo"
        />
        {formErrorState.fullName != null && (
          <p data-testid="fullNameError" role="alert">
            {formErrorState.fullName}
          </p>
        )}

        <label htmlFor="email">E-mail</label>
        <input id="email" name="email" type="text" placeholder="Seu e-mail" />
        {formErrorState.email != null && (
          <p data-testid="emailError" role="alert">
            {formErrorState.email}
          </p>
        )}

        <label htmlFor="username">Usuário</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="Seu usuário"
        />
        {formErrorState.username != null && (
          <p data-testid="usernameError" role="alert">
            {formErrorState.username}
          </p>
        )}

        <label htmlFor="password">Senha</label>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="Sua senha"
        />
        {formErrorState.password != null && (
          <p data-testid="passwordError" role="alert">
            {formErrorState.password}
          </p>
        )}

        <button type="submit">Cadastre-se</button>
      </form>
    </div>
  );
}
