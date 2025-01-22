import crypto from "node:crypto";
import type { CreateUser, UserLike } from "./user.types";

export class User {
  readonly #id: string;
  readonly #fullName: string;
  readonly #email: string;
  readonly #passwordHash: string;
  readonly #createdAt: Date;
  readonly #updatedAt: Date;

  private constructor(
    id: string,
    fullName: string,
    email: string,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.#id = id;
    this.#fullName = fullName;
    this.#email = email;
    this.#passwordHash = passwordHash;
    this.#createdAt = createdAt;
    this.#updatedAt = updatedAt;
  }

  public get id(): string {
    return this.#id;
  }

  public get fullName(): string {
    return this.#fullName;
  }

  public get username(): string {
    const names = this.#fullName.split(" ");
    if (names.length < 2) {
      const firstName = names[0].toLocaleLowerCase();

      return firstName;
    }

    const [name, ...surname] = names;
    const firstCharacter = name[0].toLocaleLowerCase();
    const lastName = surname[surname.length - 1].toLocaleLowerCase();

    return `${firstCharacter}${lastName}`;
  }

  public get email(): string {
    return this.#email;
  }

  public get passwordHash(): string {
    return this.#passwordHash;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public static create(user: CreateUser): User {
    const date = new Date();

    return new User(
      crypto.randomUUID(),
      user.fullName,
      user.email,
      user.passwordHash,
      date,
      date
    );
  }

  public static with(userFixture: UserLike): User {
    return new User(
      userFixture.id,
      userFixture.fullName,
      userFixture.email,
      userFixture.passwordHash,
      userFixture.createdAt,
      userFixture.updatedAt
    );
  }

  public toJSON(): UserLike {
    return {
      id: this.#id,
      fullName: this.#fullName,
      email: this.#email,
      passwordHash: this.#passwordHash,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
