"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  CreateAnimalInputDto,
  createAnimalInputSchema,
} from "@/app/use-cases/animals/create-animal/create-animal.dto";
import { Loader2 } from "lucide-react";

export default function RegisterAnimalPage() {
  const form = useForm({
    resolver: zodResolver(createAnimalInputSchema),
    defaultValues: {
      name: "",
      age: undefined,
      history: "",
      observations: "",
    },
  });

  const { isSubmitting } = form.formState;

  const submitButtonText = isSubmitting ? "Cadastrando..." : "Cadastrar";

  const handleRegisterAnimal: SubmitHandler<CreateAnimalInputDto> = async (
    values
  ) => {
    const response = await fetch("/api/animals", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      form.setError("root", {
        message: "Failed to register animal.",
      });

      return;
    }

    form.reset();
  };

  return (
    <>
      <h1 className="text-4xl xl:text-5xl font-bold">Opata</h1>
      <Card className="xl:w-[768px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleRegisterAnimal)}>
            <CardHeader>
              <CardTitle>
                <h2>Cadastrar novo animal</h2>
              </CardTitle>

              <CardDescription>
                Informe os dados do novo animal a ser cadastrado.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Nome*</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nome do animal"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage data-testid="nameError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="age">Idade</FormLabel>
                    <FormControl>
                      <Input
                        id="age"
                        type="number"
                        min={0}
                        placeholder="Idade do animal"
                        {...field}
                        value={field.value ?? ""}
                        onChange={(e) =>
                          field.onChange(Number(e.target.value) || undefined)
                        }
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="history">História</FormLabel>
                    <FormControl>
                      <Input
                        id="history"
                        type="text"
                        placeholder="História do animal"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="observations">Observações</FormLabel>
                    <FormControl>
                      <Input
                        id="observations"
                        type="text"
                        placeholder="Observações adicionais"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
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
    </>
  );
}
