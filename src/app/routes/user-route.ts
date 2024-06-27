import express from "express";
import { UserService } from "../../feature/users/service/service";
import { UserRepository } from "../../feature/users/repository/repository";
import { UserController } from "../../feature/users/controller/controller";
import { PrismaClient } from "@prisma/client";

const userRepository = new UserRepository(new PrismaClient());
const userService = new UserService(userRepository);
const userController = new UserController(userService);

export const userRoute = express.Router();
userRoute.post("/register", userController.register.bind(userController));
userRoute.post("/login", userController.login.bind(userController));



