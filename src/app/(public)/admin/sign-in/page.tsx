"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    <Card className="size-full xl:w-96">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignIn)}>
          <CardHeader>
            <CardTitle>
              <h1>Autenticar</h1>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
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

                  <FormMessage data-testid="usernameError" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
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

                  <FormMessage data-testid="passwordError" />
                </FormItem>
              )}
            />

            {form.formState.errors.root?.message != null && (
              <FormMessage data-testid="invalidCredentialsError">
                {form.formState.errors.root.message}
              </FormMessage>
            )}
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
  );
}
