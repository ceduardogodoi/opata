export type CreateUser = {
  fullName: string;
  email: string;
  username: string;
  password: string;
};

export type UserLike = {
  id: string;
  fullName: string;
  email: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UpdateUser = {
  fullName: string;
  email: string;
  username: string;
};
