import crypto from "node:crypto";
import { AnimalLike, CreateAnimal } from "./animal.types";
import { DateOfBirth } from "@/app/value-objects/date-of-birth/date-of-birth";

/**
 * Animal Entity.
 *
 * This entity is used to represent an animal.
 */
export class Animal {
  readonly #id: string;
  readonly #name: string;
  readonly #isAdopted: boolean;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;
  readonly #dateOfBirth?: DateOfBirth;
  readonly #history?: string;
  readonly #observations?: string;

  private constructor(
    id: string,
    name: string,
    isAdopted: boolean,
    createdAt: Date,
    updatedAt: Date,
    dateOfBirth?: DateOfBirth,
    history?: string,
    observations?: string
  ) {
    this.#id = id;
    this.#name = name;
    this.#isAdopted = isAdopted;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
    this.#dateOfBirth = dateOfBirth;
    this.#history = history;
    this.#observations = observations;
  }

  /**
   * Get the animal ID.
   *
   * @returns The animal ID.
   */
  public get id(): string {
    return this.#id;
  }

  /**
   * Get the animal name.
   *
   * @returns The animal name.
   */
  public get name(): string {
    return this.#name;
  }

  /**
   * Get the animal adoption status.
   *
   * @returns The animal adoption status.
   */
  public get isAdopted(): boolean {
    return this.#isAdopted;
  }

  /**
   * Get the animal creation date.
   *
   * @returns The animal creation date.
   */
  public get createdAt(): Date {
    return this.#createdAt;
  }

  /**
   * Get the animal update date.
   *
   * @returns The animal update date.
   */
  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  /**
   * Get the animal date of birth.
   *
   * @returns The animal date of birth.
   */
  public get dateOfBirth(): DateOfBirth | undefined {
    return this.#dateOfBirth;
  }

  /**
   * Get the animal age.
   *
   * @returns The animal age.
   */
  public get age(): number | undefined {
    return this.#dateOfBirth?.age;
  }

  /**
   * Get the animal history.
   *
   * @returns The animal history.
   */
  public get history(): string | undefined {
    return this.#history;
  }

  /**
   * Get the animal observations.
   *
   * @returns The animal observations.
   */
  public get observations(): string | undefined {
    return this.#observations;
  }

  /**
   * Create a new animal.
   *
   * @param animal - The animal data.
   * @returns The new animal.
   */
  public static create(animal: CreateAnimal): Animal {
    const date = new Date();

    return new Animal(
      crypto.randomUUID(),
      animal.name,
      false,
      date,
      date,
      animal.dateOfBirth,
      animal.history,
      animal.observations
    );
  }

  /**
   * Create an animal from data.
   *
   * @param data - The animal data.
   * @returns The animal.
   */
  public static with(data: AnimalLike): Animal {
    return new Animal(
      data.id,
      data.name,
      data.isAdopted,
      data.createdAt,
      data.updatedAt,
      data.dateOfBirth,
      data.history,
      data.observations
    );
  }

  /**
   * Convert the animal to a JSON object.
   *
   * @returns The animal JSON.
   */
  public toJSON(): AnimalLike {
    return {
      id: this.#id,
      name: this.#name,
      isAdopted: this.#isAdopted,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
      dateOfBirth: this.#dateOfBirth,
      age: this.#dateOfBirth?.age,
      history: this.#history,
      observations: this.#observations,
    };
  }
}
