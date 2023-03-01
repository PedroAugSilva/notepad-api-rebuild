import { client } from "../../lib/prisma";

interface INote {
  title: string;
  content: string;
  user_id: string;
  id: string;
}

export class EditNoteUseCase {
  async execute(props: INote) {
    await client.note.update({
      where: {
        id: props.id,
      },
      data: {
        ...props,
      },
    });
  }
}
