import { client } from "../../lib/prisma";

export class CreateNoteUseCase {
  async execute(user_id: string) {
    await client.note.create({
      data: {
        title: "Untitled",
        content: "",
        user_id,
      },
    });
  }
}
