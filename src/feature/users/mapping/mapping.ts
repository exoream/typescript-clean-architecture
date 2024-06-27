import { User, Prisma } from "@prisma/client";
import { UserCore, UserLogin, UserRegister } from "../model/model";
import { UserResponse } from "../dto/response/response";

// User Model to Core
export function userToCore(user: User): UserCore {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    createdAt: user.created_at.toISOString(),
    updatedAt: user.updated_at.toISOString(),
  };
}

// Core Model to User
export function coreToUser(user: UserCore): User {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    password: user.password,
    role: user.role,
    created_at: new Date(user.createdAt),
    updated_at: new Date(user.updatedAt),
  };
}

// List of User Model to Core
export function listUsersToCores(users: User[]): UserCore[] {
  return users.map((user) => userToCore(user));
}

// List of Core Model to User
export function listCoresToUsers(users: UserCore[]): User[] {
  return users.map((user) => coreToUser(user));
}

export function userRegisterToModel(user: UserRegister): Prisma.UserCreateInput {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

export function userModelToUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
}

export function listUserModelToUserResponse(users: User[]): UserResponse[] {
  return users.map((user) => userModelToUserResponse(user));
}

export function userLoginToUserModel(user: UserLogin): Prisma.UserWhereUniqueInput {
  return {
    email: user.email,
    password: user.password,
  };
}
