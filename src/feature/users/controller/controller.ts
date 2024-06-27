import { Request, Response, NextFunction } from "express";
import { userRegisterRequestToCore } from "../dto/request/mapping";
import { UserServiceInterface } from "../interface/interface";
import { UserRegister } from "../model/model";

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
}
