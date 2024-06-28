import { UserRepositoryInterface } from "../interface/interface";
import { UserCore, UserLogin, UserRegister } from "../model/model";
import { UserResponse } from "../dto/response/response";
import { PrismaClient } from "@prisma/client";
import {
  userToCore,
  coreToUser,
  listUserModelToUserResponse,
  userRegisterToModel,
  userModelToUserResponse
} from "../mapping/mapping";
import { ResponseError } from "../../../utils/helper/response-error";

export class UserRepository implements UserRepositoryInterface {
  private db: PrismaClient;

  constructor(db: PrismaClient) {
    this.db = db;
  }

  async register(user: UserRegister): Promise<UserResponse> {
    const request = userRegisterToModel(user);
    const data = await this.db.user.create({ data: request });
    const response = userModelToUserResponse(data);
    return response;
  }

  async login(user: UserLogin): Promise<UserResponse> {
    const data = await this.db.user.findUnique({
      where: { email: user.email },
    });

    if (!data) {
      throw new ResponseError(400, "User not found");
    }

    const response = userModelToUserResponse(data);
    return response;
  }

  async getAll(): Promise<UserResponse[]> {
    const data = await this.db.user.findMany();
    const response = listUserModelToUserResponse(data);
    return response;
  }

  async getById(id: string): Promise<UserResponse> {
    const data = await this.db.user.findUnique({ where: { id: id } });

    if (!data) {
      throw new ResponseError(400, "User not found");
    }

    const response = userModelToUserResponse(data);
    return response;
  }

  async delete(id: string): Promise<UserResponse> {
    const data = await this.db.user.delete({ where: { id: id } });
    const response = userModelToUserResponse(data);
    return response;
  }

  async update(id: string, user: UserCore): Promise<UserCore> {
    const request = coreToUser(user);
    const data = await this.db.user.update({
      where: { id: id },
      data: request,
    });
    const response = userToCore(data);
    return response;
  }

  async getUserByEmail(email: string): Promise<UserCore | null> {
    const data = await this.db.user.findUnique({ where: { email: email } });

    if(!data) {
        return null;
    }

    const response = userToCore(data);
    return response;
  }
}
