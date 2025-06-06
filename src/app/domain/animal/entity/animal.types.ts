export type CreateAnimal = {
  name: string;
  dateOfBirth?: string;
  history?: string;
  observations?: string;
};

export type AnimalLike = {
  id: string;
  name: string;
  isAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
  dateOfBirth?: string;
  age?: number;
  history?: string;
  observations?: string;
};
