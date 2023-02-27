import { client } from "../../lib/prisma";
import { hash } from "bcrypt";

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ name, email, password }: IUser) {
    const alreadyExistUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (alreadyExistUser) {
      throw new Error("Username or password invalid");
    }
    const passwordHash = await hash(password, 8);
    await client.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });
  }
}
