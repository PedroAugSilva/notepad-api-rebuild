import { client } from "../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IUser {
  email: string;
  password: string;
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IUser) {
    const alreadyExistUser = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!alreadyExistUser) {
      throw new Error("Email or password invalid");
    }
    const passwordCompare = await compare(password, alreadyExistUser.password);

    if (!passwordCompare) {
      throw new Error("Email or password invalid");
    }

    const token = sign({}, process.env.JWT_KEY!, {
      subject: alreadyExistUser.id,
      expiresIn: "30s",
    });

    return { user: alreadyExistUser, token };
  }
}
