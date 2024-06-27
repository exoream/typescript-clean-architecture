import { Request, Response, NextFunction } from "express";
import { userRegisterRequestToCore } from "../dto/request/mapping";
import { UserServiceInterface } from "../interface/interface";
import { UserLogin, UserRegister } from "../model/model";

export class UserController {
  constructor(private userService: UserServiceInterface) {
    this.userService = userService;
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserRegister = req.body as UserRegister;
      const response = await this.userService.register(request);
      return res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const request: UserLogin = req.body as UserLogin;
      const { data: response, token } = await this.userService.login(request);
      return res.status(200).json({ data: response, token });
    } catch (error) {
      next(error);
    }
  }
}
