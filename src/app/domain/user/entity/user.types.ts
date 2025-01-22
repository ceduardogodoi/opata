export type CreateUser = {
  fullName: string;
  email: string;
  passwordHash: string;
};

export type UserLike = {
  id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};
