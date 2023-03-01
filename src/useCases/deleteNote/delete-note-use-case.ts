import { client } from "../../lib/prisma";

export class DeleteNoteUseCase {
  async execute(id: string) {
    await client.note.delete({
      where: {
        id,
      },
    });
  }
}
