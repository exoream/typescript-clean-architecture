import { UserCore, UserRegister, UserLogin } from "../model/model";
import { UserResponse } from "../dto/response/response";

export interface UserRepositoryInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(user: UserLogin): Promise<UserResponse>;
  getAll(): Promise<UserCore[]>;
  getById(id: string): Promise<UserCore>;
  update(id: string, user: UserCore): Promise<UserCore>;
  delete(id: string): Promise<UserCore>;
  getUserByEmail(email: string): Promise<UserCore | null>;
}

export interface UserServiceInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(user: UserLogin): Promise<{ data: UserResponse, token: string}>;
  getAll(): Promise<UserCore[]>;
  getById(id: string): Promise<UserCore>;
  update(id: string, user: UserCore): Promise<UserCore>;
  delete(id: string): Promise<UserCore>;
}
