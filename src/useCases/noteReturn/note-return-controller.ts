import zod from "zod";
import { FastifyRequest } from "fastify";
import { NoteReturnUseCase } from "./note-return-use-case";

export class NoteReturnController {
  async handle(req: FastifyRequest) {
    const noteParams = zod.object({
      user_id: zod.string(),
    });

    const { user_id } = noteParams.parse(req.params);

    const noteReturnUseCase = new NoteReturnUseCase();

    return await noteReturnUseCase.execute(user_id);
  }
}
