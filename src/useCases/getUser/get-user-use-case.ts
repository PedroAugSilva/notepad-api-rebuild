import { client } from "../../lib/prisma";

export class GetUserUseCase {
  async execute(email: string) {
    const alreadyExistUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    return alreadyExistUser;
  }
}
