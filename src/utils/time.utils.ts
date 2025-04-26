type TimeParts = {
  milliseconds?: number;
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
};

/**
 * Time converter utility class.
 */
export class TimeConverter {
  readonly #timeParts: Required<TimeParts>;

  constructor(timeParts: TimeParts) {
    this.#timeParts = {
      milliseconds: timeParts.milliseconds ?? 0,
      seconds: timeParts.seconds ?? 0,
      minutes: timeParts.minutes ?? 0,
      hours: timeParts.hours ?? 0,
      days: timeParts.days ?? 0,
    };
  }

  /**
   * Converts the time parts to milliseconds.
   * @returns The time in milliseconds.
   */
  public toMilliseconds(): number {
    const result = (
      BigInt(this.#timeParts.milliseconds) +
      BigInt(this.#timeParts.seconds) * BigInt(1000) +
      BigInt(this.#timeParts.minutes) * BigInt(60) * BigInt(1000) +
      BigInt(this.#timeParts.hours) * BigInt(60) * BigInt(60) * BigInt(1000) +
      BigInt(this.#timeParts.days) * BigInt(24) * BigInt(60) * BigInt(60) * BigInt(1000)
    );

    return Number(result);
  } 
}
