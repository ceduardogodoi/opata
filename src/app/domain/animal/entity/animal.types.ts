export type CreateAnimal = {
  name: string;
  age?: number;
  history?: string;
  observations?: string;
};

export type AnimalLike = {
  id: string;
  name: string;
  isAdopted: boolean;
  createdAt: Date;
  updatedAt: Date;
  age?: number;
  history?: string;
  observations?: string;
};
