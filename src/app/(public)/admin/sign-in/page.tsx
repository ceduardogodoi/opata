"use client";

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
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  const form = useForm({
    resolver: zodResolver(signInInputSchema),
    defaultValues: {
      username: username ?? "",
      password: "",
    },
  });

  const handleSignIn: SubmitHandler<SignInInputDto> = (values) => {
    console.log(values);
  };

  return (
    <Card className="size-full">
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
                      // disabled={isSubmitting}
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
                      // disabled={isSubmitting}
                    />
                  </FormControl>

                  <FormMessage data-testid="passwordError" />
                </FormItem>
              )}
            />
          </CardContent>

          <CardFooter className="flex justify-end">
            <Button
              className="w-full xl:w-max"
              type="submit"
              // disabled={isSubmitting}
            >
              {/* {isSubmitting && <Loader2 className="animate-spin" />} */}
              Entrar
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
