import { comparePassword, hashPassword } from "../../../utils/helper/bcrypt";
import { ResponseError } from "../../../utils/helper/response-error";
import { createToken } from "../../../utils/middleware/jwt";
import { UserValidation } from "../../../utils/validation/user-validation";
import { Validation } from "../../../utils/validation/validation";
import {
  UserServiceInterface,
  UserRepositoryInterface,
} from "../interface/interface";
import { UserCore, UserRegister } from "../model/model";
import { UserResponse } from "../dto/response/response";

export class UserService implements UserServiceInterface {
  constructor(private repository: UserRepositoryInterface) {
    this.repository = repository;
  }

  async register(user: UserRegister): Promise<UserResponse> {
    const data = Validation.validate(UserValidation.REGISTER, user);

    if (!user.email || !user.name || !user.password) {
      throw new ResponseError(400, "Please fill all fields");
    }

    // Check if email is already registered
    const email = await this.repository.getUserByEmail(user.email);
    if (email) {
      throw new ResponseError(400, "Email already registered");
    }

    // Hash password
    const hashedPassword = await hashPassword(user.password);
    data.password = hashedPassword;

    const response = await this.repository.register(data);
    return response;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ user: UserCore; token: string }> {
    const data = Validation.validate(UserValidation.LOGIN, { email, password });

    if (!email || !password) {
      throw new ResponseError(400, "Please fill all fields");
    }

    // Check if email is registered
    const user = await this.repository.getUserByEmail(email);
    if (!user) {
      throw new ResponseError(400, "User not found");
    }

    // Check if password is valid
    const isPasswordValid = await comparePassword(password, data.password);
    if (!isPasswordValid) {
      throw new ResponseError(400, "Invalid password");
    }

    // Create token
    const token = createToken(user.id, user.role);
    return { user, token };
  }

  async getAll(): Promise<UserCore[]> {
    const response = await this.repository.getAll();
    return response;
  }

  async getById(id: string): Promise<UserCore> {
    if (!id) {
      throw new ResponseError(400, "Id is required");
    }

    const response = await this.repository.getById(id);
    return response;
  }

  async update(id: string, user: UserCore): Promise<UserCore> {
    const data = Validation.validate(UserValidation.UPDATE, user);

    if (!id) {
      throw new ResponseError(400, "Id is required");
    }

    if(data.name) {
        user.name = data.name
    }

    if(data.email) {
        user.email = data.email
    }

    if(data.password) {
        user.password = await hashPassword(data.password)
    }

    const response = this.repository.update(id, data);
    return response;
  }

  async delete(id: string): Promise<UserCore> {
    if (!id) {
      throw new ResponseError(400, "Id is required");
    }

    const response = this.repository.delete(id);
    return response;
  }
}
