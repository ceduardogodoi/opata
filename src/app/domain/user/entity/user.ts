import crypto from "node:crypto";
import bcrypt from "bcrypt";
import type { CreateUser, UserLike } from "./user.types";

export class User {
  readonly #id: string;
  readonly #fullName: string;
  readonly #email: string;
  readonly #username: string;
  readonly #passwordHash: string;
  readonly #createdAt: Date;
  #updatedAt: Date;

  private constructor(
    id: string,
    fullName: string,
    email: string,
    username: string,
    passwordHash: string,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.#id = id;
    this.#fullName = fullName;
    this.#email = email;
    this.#username = username;
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

  public get email(): string {
    return this.#email;
  }

  public get username(): string {
    return this.#username;
  }

  public get passwordHash(): string {
    return this.#passwordHash;
  }

  public get createdAt(): Date {
    return this.#createdAt;
  }

  public set updatedAt(date: Date) {
    this.#updatedAt = date;
  }

  public get updatedAt(): Date {
    return this.#updatedAt;
  }

  public static async create(user: CreateUser): Promise<User> {
    const date = new Date();

    const passwordHash = await bcrypt.hash(user.password, 10);

    return new User(
      crypto.randomUUID(),
      user.fullName,
      user.email,
      user.username,
      passwordHash,
      date,
      date
    );
  }

  public static with(userFixture: UserLike): User {
    return new User(
      userFixture.id,
      userFixture.fullName,
      userFixture.email,
      userFixture.username,
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
      username: this.#username,
      passwordHash: this.#passwordHash,
      createdAt: this.#createdAt,
      updatedAt: this.#updatedAt,
    };
  }
}
