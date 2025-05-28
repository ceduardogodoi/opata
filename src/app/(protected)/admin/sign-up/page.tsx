"use client";

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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SignUpPage() {
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
    const response = await fetch("/api/sign-up", {
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
    <div className="min-h-screen flex flex-col items-center justify-center p-0 sm:p-4">
      <Image
        src="/images/opata-logo.png"
        alt="Opata Logo"
        width={160}
        height={64}
        className="mb-8"
        priority
      />

      <div className="w-full h-screen sm:h-auto sm:w-[480px] md:w-[640px] xl:w-[768px] xl:bg-white xl:shadow-lg p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignUp)}
            className="h-full flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-opata-green font-heading text-center text-2xl mb-2">
                Criar nova conta
              </h2>

              <p className="text-center text-gray-600">
                Informe seus dados para criar seu acesso.
              </p>
            </div>

            <div className="space-y-4 flex-1">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName" className="text-opata-green">
                      Nome completo*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Maria da Silva"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
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
                    <FormLabel htmlFor="username" className="text-opata-green">
                      Usuário*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="msilva"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
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
                    <FormLabel htmlFor="email" className="text-opata-green">
                      E-mail*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="mariasilva@email.com"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
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
                      <FormLabel
                        htmlFor="password"
                        className="text-opata-green"
                      >
                        Senha*
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="password"
                          type="password"
                          {...field}
                          disabled={isSubmitting}
                          className="border-opata-gold focus:ring-opata-green"
                        />
                      </FormControl>

                      <FormDescription>Mínimo de 4 caracteres.</FormDescription>

                      <FormMessage data-testid="passwordError" />
                    </FormItem>
                  );
                }}
              />
            </div>

            <div className="flex justify-end mt-8">
              <Button
                className="w-full xl:w-max bg-opata-green hover:bg-opata-green-hover text-white"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="animate-spin mr-2" />}

                {submitButtonText}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
