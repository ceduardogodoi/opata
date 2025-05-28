"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  CreateAnimalInputDto,
  createAnimalInputSchema,
} from "@/app/use-cases/animals/create-animal/create-animal.dto";
import { Loader2 } from "lucide-react";

export default function AddAnimalPage() {
  const form = useForm({
    resolver: zodResolver(createAnimalInputSchema),
    defaultValues: {
      name: "",
      age: "",
      history: "",
      observations: "",
    },
  });

  const { isSubmitting } = form.formState;

  const submitButtonText = isSubmitting ? "Cadastrando..." : "Cadastrar";

  const handleAddAnimal: SubmitHandler<CreateAnimalInputDto> = async (
    values
  ) => {
    const response = await fetch("/api/animals", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (response.status !== 201) {
      form.setError("root", {
        message: "Falha ao adicionar animal.",
      });

      return;
    }

    form.reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-0 sm:p-4">
      <div className="w-full h-screen sm:h-auto sm:w-[480px] md:w-[640px] xl:w-[768px] xl:bg-white xl:shadow-lg p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddAnimal)}
            className="h-full flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-opata-green font-heading text-center text-2xl mb-2">
                Cadastrar novo animal
              </h2>
              <p className="text-center text-gray-600">
                Informe os dados do novo animal a ser cadastrado.
              </p>
            </div>

            <div className="space-y-4 flex-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name" className="text-opata-green">
                      Nome*
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nome do animal"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
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
                    <FormLabel htmlFor="age" className="text-opata-green">
                      Idade
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Idade do animal"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
                      />
                    </FormControl>
                    <FormMessage data-testid="ageError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="history"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="history" className="text-opata-green">
                      História
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="history"
                        type="text"
                        placeholder="Histórico do animal"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
                      />
                    </FormControl>
                    <FormMessage data-testid="historyError" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      htmlFor="observations"
                      className="text-opata-green"
                    >
                      Observações
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="observations"
                        type="text"
                        placeholder="Observações sobre o animal"
                        {...field}
                        disabled={isSubmitting}
                        className="border-opata-gold focus:ring-opata-green"
                      />
                    </FormControl>
                    <FormMessage data-testid="observationsError" />
                  </FormItem>
                )}
              />

              {form.formState.errors.root?.message != null && (
                <FormMessage data-testid="rootError">
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
