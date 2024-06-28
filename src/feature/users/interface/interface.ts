import { UserCore, UserRegister, UserLogin, UserUpdate, UserResponse } from "../model/model";

export interface UserRepositoryInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(user: UserLogin): Promise<UserResponse>;
  getAll(): Promise<UserResponse[]>;
  getById(id: string): Promise<UserResponse>;
  update(id: string, user: UserUpdate): Promise<UserResponse>;
  delete(id: string): Promise<UserResponse>;
  getUserByEmail(email: string): Promise<UserCore | null>;
}

export interface UserServiceInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(user: UserLogin): Promise<{ data: UserResponse; token: string }>;
  getAll(): Promise<UserResponse[]>;
  getById(id: string): Promise<UserResponse>;
  update(id: string, user: UserUpdate): Promise<UserResponse>;
  delete(id: string): Promise<UserResponse>;
}
