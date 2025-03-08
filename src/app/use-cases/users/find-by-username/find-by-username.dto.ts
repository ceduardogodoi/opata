import { User } from "@/app/domain/user/entity/user";

export type FindByUsernameInputDto = string;

export type FindByUsernameOutputDto = User | null;
