import { EditNoteUseCase } from "./edit-note-use-case";
import { FastifyRequest } from "fastify";
import zod from "zod";

export class EditNoteController {
  async handle(req: FastifyRequest) {
    const noteParams = zod.object({
      id: zod.string(),
    });

    const noteBody = zod.object({
      title: zod.string(),
      content: zod.string(),
      user_id: zod.string(),
    });

    const { id } = noteParams.parse(req.params);
    const bodyParsed = noteBody.parse(req.body);

    const editUserUseCase = new EditNoteUseCase();

    await editUserUseCase.execute({ id, ...bodyParsed });
  }
}
