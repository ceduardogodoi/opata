export type FindAllAnimalsPresentOutput = {
  id: string;
  name: string;
  isAdopted: boolean;
  age?: number;
  history?: string;
  observations?: string;
}[];
