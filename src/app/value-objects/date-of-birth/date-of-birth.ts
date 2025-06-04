/**
 * Animal Date of Birth Value Object.
 *
 * This value object is used to store the date of birth of an animal.
 *
 * @example
 * const dateOfBirth = new DateOfBirth(new Date("2025-01-01T00:00:00.000Z"));
 * console.log(dateOfBirth.value); // 2025-01-01T00:00:00.000Z
 */
export class DateOfBirth {
  readonly #value: Date;

  constructor(date: Date) {
    this.#validate(date);

    this.#value = date;
  }

  /**
   * Get the date of birth.
   *
   * @returns The date of birth.
   */
  public get value(): Date {
    return this.#value;
  }

  /**
   * Get the age of the animal.
   *
   * @returns The age of the animal.
   */
  public get age(): number {
    const today = new Date();
    const birthDate = this.#value;
    return today.getFullYear() - birthDate.getFullYear();
  }

  #validate(date: Date): void {
    if (date > new Date()) {
      throw new Error("Data de nascimento não pode ser uma data no futuro.");
    }
  }
}
