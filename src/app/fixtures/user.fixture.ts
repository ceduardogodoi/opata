import type { CreateUser, UserLike } from "../domain/user/entity/user.types";

export const password = "cTF3MmUzcjQ=";
export const passwordHash =
  "$2b$10$iGODARbBXqgyUi.Ul9P1TObr5FNZOoZXcG7R.FYMCN4vIKshLUJMK";

export const createUserFixture: CreateUser = {
  fullName: "John Doe",
  email: "john.doe@email.com",
  passwordHash,
};

const mockDate = new Date(2025, 0, 21, 0, 0, 0, 0);
export const userFixture: UserLike = {
  id: "73547cf9-0dd1-4217-9bd8-678cba042b35",
  fullName: "John Doe",
  email: "john.doe@email.com",
  passwordHash,
  createdAt: mockDate,
  updatedAt: mockDate,
};
