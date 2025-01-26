import { User } from "@/app/domain/user/entity/user";
import type { SignUpPresentOutput } from "./sign-up.presenter.dto";

export class SignUpPresenter {
  constructor() {
    throw new Error("SignUpPresenter constructor is private.");
  }

  public static present(user: User): SignUpPresentOutput {
    return {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
