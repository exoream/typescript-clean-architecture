import { Request, Response, NextFunction } from "express";
import { UserServiceInterface } from "../interface/interface";
import { UserLogin, UserRegister } from "../model/model";
import { extraToken } from "../../../utils/middleware/jwt";

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

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = extraToken(req);

      if (role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const response = await this.userService.getAll();
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = extraToken(req);
      const userId = req.params.id;

      if (role !== "admin" && id !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const response = await this.userService.getById(userId);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = extraToken(req);
      const userId = req.params.id;

      if (role !== "admin" && id !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const response = await this.userService.delete(userId);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id, role } = extraToken(req);
      const userId = req.params.id;

      if (role !== "admin" && id !== userId) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const request = req.body;
      const response = await this.userService.update(userId, request);
      return res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
