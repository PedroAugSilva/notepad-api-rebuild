import zod from "zod";
import { FastifyRequest } from "fastify";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

export class AuthenticateUserController<T> {
  async handle(req: FastifyRequest) {
    const userBody = zod.object({
      email: zod.string(),
      password: zod.string(),
    });

    const bodyParsed = userBody.parse(req.body);

    const authenticateUserUseCase = new AuthenticateUserUseCase();
    const token = await authenticateUserUseCase.execute(bodyParsed);

    return { token };
  }
}
