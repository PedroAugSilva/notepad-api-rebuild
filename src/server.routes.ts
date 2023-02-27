import { FastifyInstance } from "fastify";
import { ensureAuthenticatedUser } from "./middlewares/ensureAuthenticatedUser";
import { AuthenticateUserController } from "./useCases/authenticateUser/authenticate-user-controller";
import { CreateUserController } from "./useCases/createUser/create-user-controller";
import { GetUserController } from "./useCases/getUser/get-user-controller";

export const serverRoutes = async (app: FastifyInstance) => {
  const createUserController = new CreateUserController();
  const authenticateUserController = new AuthenticateUserController();
  const getUserController = new GetUserController();

  app.post("/user/signup", createUserController.handle);
  app.post("/user/signin", authenticateUserController.handle);
  app.post(
    "/user",
    { preHandler: ensureAuthenticatedUser },
    getUserController.handle
  );
};
