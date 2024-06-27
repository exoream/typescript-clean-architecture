export type UserCore = {
  id: string;
  name: string | null;
  email: string;
  password: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type UserRegister = {
  name: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
