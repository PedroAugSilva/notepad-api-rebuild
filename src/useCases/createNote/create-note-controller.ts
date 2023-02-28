import zod from "zod";
import { FastifyRequest } from "fastify";
import { CreateNoteUseCase } from "./create-note-use-case";

export class CreateNoteController {
  async handle(req: FastifyRequest) {
    const noteParams = zod.object({
      user_id: zod.string(),
    });

    const { user_id } = noteParams.parse(req.params);

    const createNoteUseCase = new CreateNoteUseCase();

    await createNoteUseCase.execute(user_id);
  }
}
