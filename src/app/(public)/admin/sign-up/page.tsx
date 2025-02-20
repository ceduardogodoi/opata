"use client";

import { type JSX } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  type CreateUserInputDto,
  createUserInputSchema,
} from "@/app/use-cases/users/sign-up/sign-up.dto";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function SignUpPage(): JSX.Element {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(createUserInputSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const submitButtonText = isSubmitting
    ? "Criando sua conta..."
    : "Cadastre-se";

  const handleSignUp: SubmitHandler<CreateUserInputDto> = async (values) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sign-up`, {
      method: "POST",
      body: JSON.stringify(values),
    });

    // username already taken
    if (response.status === 409) {
      form.setError("username", {
        message: "Usuário já existe.",
      });

      return;
    }

    router.push(`/admin/sign-in?username=${values.username}`);
  };

  return (
    <main className="flex flex-col justify-center items-center min-h-screen space-y-6 bg-slate-100 p-3">
      <h1 className="text-4xl xl:text-5xl font-bold">Opata</h1>

      <Card className="xl:w-[768px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignUp)}>
            <CardHeader>
              <CardTitle>
                <h2>Criar nova conta</h2>
              </CardTitle>

              <CardDescription>
                Informe seus dados para criar seu acesso.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Nome completo*</FormLabel>
                    <FormControl>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Maria da Silva"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>

                    <FormDescription>Mínimo de 4 caracteres.</FormDescription>

                    <FormMessage data-testid="fullNameError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Usuário*</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="msilva"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>

                    <FormDescription>
                      Sugestão: Primeira letra do nome + sobrenome (ex.: msilva)
                    </FormDescription>

                    <FormMessage data-testid="usernameError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">E-mail*</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mariasilva@email.com"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>

                    <FormMessage data-testid="emailError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha*</FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          disabled={isSubmitting}
                        />
                      </FormControl>

                      <FormDescription>Mínimo de 4 caracteres.</FormDescription>

                      <FormMessage data-testid="passwordError" />
                    </FormItem>
                  );
                }}
              />
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                className="w-full xl:w-max"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin" />}

                {submitButtonText}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </main>
  );
}
