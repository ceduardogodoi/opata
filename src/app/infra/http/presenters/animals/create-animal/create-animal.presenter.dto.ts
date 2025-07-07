export interface CreateAnimalPresentOutput {
  id: string;
  name: string;
  isAdopted: boolean;
  dateOfBirth?: Date;
  age?: number;
  history?: string;
  observations?: string;
}
