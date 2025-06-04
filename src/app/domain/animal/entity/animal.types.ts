import { DateOfBirth } from "@/app/value-objects/date-of-birth/date-of-birth";

export type CreateAnimal = {
  name: string;
  dateOfBirth?: DateOfBirth;
  history?: string;
  observations?: string;
};

export type AnimalLike = {
  id: string;
  name: string;
  isAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
  dateOfBirth?: DateOfBirth;
  age?: number;
  history?: string;
  observations?: string;
};
