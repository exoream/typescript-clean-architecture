import { UserCore, UserRegister } from "../model/model";
import { UserResponse } from "../dto/response/response";

export interface UserRepositoryInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(email: string, password: string): Promise<UserCore>;
  getAll(): Promise<UserCore[]>;
  getById(id: string): Promise<UserCore>;
  update(id: string, user: UserCore): Promise<UserCore>;
  delete(id: string): Promise<UserCore>;
  getUserByEmail(email: string): Promise<UserCore | null>;
}

export interface UserServiceInterface {
  register(user: UserRegister): Promise<UserResponse>;
  login(email: string, password: string): Promise<{ user: UserCore, token: string}>;
  getAll(): Promise<UserCore[]>;
  getById(id: string): Promise<UserCore>;
  update(id: string, user: UserCore): Promise<UserCore>;
  delete(id: string): Promise<UserCore>;
}
