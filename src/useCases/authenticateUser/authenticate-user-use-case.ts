import { client } from "../../lib/prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { GenerateRefreshTokenUseCase } from "../generateRefreshToken/generate-refresh-token-use-case";
import { GenerateRefreshTokenProvider } from "../generateRefreshToken/generate-refresh-token-provider";

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

    await client.refreshToken.deleteMany({
      where: {
        user_id: alreadyExistUser.id,
      },
    });

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider();

    const refreshToken = await generateRefreshTokenProvider.generate(
      alreadyExistUser.id
    );

    return { user: alreadyExistUser, refreshToken };
  }
}
