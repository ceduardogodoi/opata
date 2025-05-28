"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  signInInputSchema,
  type SignInInputDto,
} from "@/app/use-cases/users/sign-in/sign-in.dto";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const form = useForm({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      username: username ?? "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;
  const submitButtonText = isSubmitting ? "Autenticando..." : "Entrar";

  const handleSignIn: SubmitHandler<SignInInputDto> = async (values) => {
    const response = await fetch("/api/sign-in", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.status !== 200) {
      form.setError("root", {
        message: "Usuário ou senha inválidos.",
      });

      return;
    }

    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Image
        src="/images/opata-logo.png"
        alt="Opata Logo"
        width={160}
        height={64}
        className="mb-8"
        priority
      />

      <div className="w-[90%] sm:w-[480px] md:w-[640px] xl:w-[768px] xl:bg-white xl:shadow-lg p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSignIn)}>
            <div className="mb-8">
              <h2 className="text-opata-green font-heading text-center text-2xl mb-2">
                Autenticar
              </h2>
            </div>

            <div className="space-y-4">
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

                    <FormMessage data-testid="usernameError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="password" className="text-opata-green">
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

                    <FormMessage data-testid="passwordError" />
                  </FormItem>
                )}
              />

              {form.formState.errors.root?.message != null && (
                <FormMessage data-testid="invalidCredentialsError">
                  {form.formState.errors.root.message}
                </FormMessage>
              )}
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
