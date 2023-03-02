import { GenerateRefreshTokenUseCase } from "./generate-refresh-token-use-case";
import { FastifyRequest } from "fastify";
import zod from "zod";

export class GenerateRefreshTokenController {
  async handle(req: FastifyRequest) {
    const refreshTokenBody = zod.object({
      refresh_token: zod.string(),
    });

    const { refresh_token } = refreshTokenBody.parse(req.body);

    const generateRefreshTokenUseCase = new GenerateRefreshTokenUseCase();

    return await generateRefreshTokenUseCase.execute(refresh_token);
  }
}
