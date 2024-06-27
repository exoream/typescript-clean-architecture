import express from "express";
import { userRoute } from "./user-route";
import { errorValidation } from "../../utils/error/error";

export const routes = express();
routes.use(express.json());
routes.use(userRoute);
routes.use(errorValidation);