"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { format } from "date-fns";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { type CreateAnimalInputDto, createAnimalInputSchema } from "./schemas";

export default function AddAnimalPage() {
  const form = useForm({
    resolver: zodResolver(createAnimalInputSchema),
    defaultValues: {
      name: "",
      dateOfBirth: "",
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
            <fieldset disabled={isSubmitting}>
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
                          className="border-opata-gold focus:ring-opata-green"
                        />
                      </FormControl>
                      <FormMessage data-testid="nameError" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-opata-green">
                        Data de nascimento (Aproximada:)
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="border-opata-gold focus:ring-opata-green font-normal"
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy")
                              ) : (
                                <span className="text-gray-500 text-base">
                                  01/01/2020
                                </span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            captionLayout="dropdown"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
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
                >
                  {isSubmitting && <Loader2 className="animate-spin mr-2" />}
                  {submitButtonText}
                </Button>
              </div>
            </fieldset>
          </form>
        </Form>
      </div>
    </div>
  );
}
