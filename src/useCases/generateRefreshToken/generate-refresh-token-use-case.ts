import { client } from "../../lib/prisma";
import dayjs from "dayjs";
import { GenerateRefreshTokenProvider } from "./generate-refresh-token-provider";
import { sign } from "jsonwebtoken";

export class GenerateRefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error("Token invalid");
    }

    const token = sign({}, process.env.JWT_KEY!, {
      subject: refreshToken.user_id,
      expiresIn: "20s",
    });

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(refreshToken.expiresIn)
    );

    if (refreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          user_id: refreshToken.user_id,
        },
      });

      const generateRefreshToken = new GenerateRefreshTokenProvider();
      const newToken = await generateRefreshToken.generate(
        refreshToken.user_id
      );

      return { token, refreshToken: newToken };
    }

    return { token };
  }
}
