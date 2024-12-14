import crypto from "node:crypto";
import { AnimalLike, CreateAnimal } from "./animal.types";

export class Animal {
  readonly #id: string;
  readonly #name: string;
  readonly #isAdopted: boolean;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;
  readonly #age?: number;
  readonly #history?: string;
  readonly #observations?: string;

  private constructor(
    id: string,
    name: string,
    isAdopted: boolean,
    createdAt: Date,
    updatedAt: Date,
    age?: number,
    history?: string,
    observations?: string
  ) {
    this.#id = id;
    this.#name = name;
    this.#isAdopted = isAdopted;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#age = age;
    this.#history = history;
    this.#observations = observations;
  }

  public get id(): string {
    return this.#id;
  }

  public get name(): string {
    return this.#name;
  }

  public get isAdopted(): boolean {
    return this.#isAdopted;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public get age(): number | undefined {
    return this.#age;
  }

  public get history(): string | undefined {
    return this.#history;
  }

  public get observations(): string | undefined {
    return this.#observations;
  }

  public static create(animal: CreateAnimal): Animal {
    return new Animal(
      crypto.randomUUID(),
      animal.name,
      false,
      new Date(),
      new Date(),
      animal.age,
      animal.history,
      animal.observations
    );
  }

  public static with(animalFixture: AnimalLike): Animal {
    return new Animal(
      animalFixture.id,
      animalFixture.name,
      animalFixture.isAdopted,
      animalFixture.createdAt,
      animalFixture.updatedAt,
      animalFixture.age,
      animalFixture.history,
      animalFixture.observations
    );
  }

  public toJSON(): AnimalLike {
    return {
      id: this.#id,
      name: this.#name,
      isAdopted: this.#isAdopted,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      age: this.#age,
      history: this.#history,
      observations: this.#observations,
    };
  }
}
