import { UserRegister } from "../request/request";
import { UserCore } from "../../model/model";

// User Register Request to Core
export function userRegisterRequestToCore(
  user: UserRegister
): Partial<UserCore> {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
  };
}

// User Login Request to Core
export function userLoginRequestToCore(user: UserRegister): Partial<UserCore> {
  return {
    email: user.email,
    password: user.password,
  };
}
