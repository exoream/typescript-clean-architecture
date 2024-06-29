import { User, Prisma } from "@prisma/client";
import { UserCore, UserLogin, UserRegister, UserUpdate, UserResponse } from "../model/model";

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

// User Register to Model
export function userRegisterToModel(user: UserRegister): Prisma.UserCreateInput {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

// User Update to Model
export function userUpdateToModel(user: UserUpdate): Prisma.UserUpdateInput {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

// User Model to Response
export function userModelToUserResponse(user: User): UserResponse {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    created_at: user.created_at.toISOString(),
    updated_at: user.updated_at.toISOString(),
  };
}

// List User Model to User Response
export function listUserModelToUserResponse(users: User[]): UserResponse[] {
  return users.map((user) => userModelToUserResponse(user));
}

// User Login to User Model
export function userLoginToUserModel(user: UserLogin): Prisma.UserWhereUniqueInput {
  return {
    email: user.email,
    password: user.password,
  };
}
