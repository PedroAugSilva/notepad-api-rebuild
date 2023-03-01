import { DeleteNoteUseCase } from "./delete-note-use-case";
import { FastifyRequest } from "fastify";
import zod from "zod";

export class DeleteNoteController {
  async handle(req: FastifyRequest) {
    const noteParms = zod.object({
      id: zod.string(),
    });

    const { id } = noteParms.parse(req.params);

    const deleteNoteUseCase = new DeleteNoteUseCase();

    await deleteNoteUseCase.execute(id);
  }
}
