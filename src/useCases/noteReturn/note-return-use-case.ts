import { client } from "../../lib/prisma";

export class NoteReturnUseCase {
  async execute(user_id: string) {
    const notes = await client.note.findMany({
      where: {
        user_id,
      },
    });
    return { notes };
  }
}
