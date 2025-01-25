import { describe, expect, it } from "vitest";
import { SignUpPresenter } from "./sign-up.presenter";
import { userFixtureInstance } from "@/app/fixtures/user.fixture";
import { SignUpPresentOutput } from "./sign-up.presenter.dto";

describe("presenters / sign up", () => {
  it("should throw an error if the constructor is called", () => {
    expect(() => new SignUpPresenter()).toThrowError(
      "SignUpPresenter constructor is private."
    );
  });

  it("should return the created animal json representation", () => {
    const response = SignUpPresenter.present(userFixtureInstance);

    const expectedResponse: SignUpPresentOutput = {
      id: userFixtureInstance.id,
      fullName: userFixtureInstance.fullName,
      email: userFixtureInstance.email,
      createdAt: userFixtureInstance.createdAt.toISOString(),
      updatedAt: userFixtureInstance.updatedAt.toISOString(),
    };

    expect(response).toStrictEqual(expectedResponse);
  });
});
