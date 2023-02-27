import zod from "zod";
import { FastifyRequest } from "fastify";
import { CreateUserUseCase } from "./create-user-use-case";

export class CreateUserController {
  async handle(req: FastifyRequest) {
    const userBody = zod.object({
      name: zod.string(),
      email: zod.string(),
      password: zod.string(),
    });

    const bodyParsed = userBody.parse(req.body);
    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute(bodyParsed);
  }
}
