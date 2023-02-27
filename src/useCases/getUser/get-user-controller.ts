import zod from "zod";
import { FastifyRequest } from "fastify";
import { GetUserUseCase } from "./get-user-use-case";

export class GetUserController {
  async handle(req: FastifyRequest) {
    const userBody = zod.object({
      email: zod.string(),
    });

    const { email } = userBody.parse(req.body);

    const getUserUseCase = new GetUserUseCase();

    const user = await getUserUseCase.execute(email);

    return { user };
  }
}
