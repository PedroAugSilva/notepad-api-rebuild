import { FastifyInstance } from "fastify";
import { ensureAuthenticatedUser } from "../middlewares/ensure-authenticated-user";
import { AuthenticateUserController } from "../useCases/authenticateUser/authenticate-user-controller";
import { CreateUserController } from "../useCases/createUser/create-user-controller";

export const userRoutes = async (app: FastifyInstance) => {
  const createUserController = new CreateUserController();
  const authenticateUserController = new AuthenticateUserController();

  app.post("/user/signup", createUserController.handle);
  app.post("/user/signin", authenticateUserController.handle);
};
