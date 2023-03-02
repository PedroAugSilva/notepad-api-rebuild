import { FastifyInstance } from "fastify";
import { AuthenticateUserController } from "../useCases/authenticateUser/authenticate-user-controller";
import { CreateUserController } from "../useCases/createUser/create-user-controller";
import { GenerateRefreshTokenController } from "../useCases/generateRefreshToken/generate-refresh-token-controller";

export const userRoutes = async (app: FastifyInstance) => {
  const createUserController = new CreateUserController();
  const authenticateUserController = new AuthenticateUserController();
  const generateRefreshTokenController = new GenerateRefreshTokenController();

  app.post("/user/signup", createUserController.handle);
  app.post("/user/signin", authenticateUserController.handle);
  // refresh token route
  app.post("/refresh-token", generateRefreshTokenController.handle);
};
