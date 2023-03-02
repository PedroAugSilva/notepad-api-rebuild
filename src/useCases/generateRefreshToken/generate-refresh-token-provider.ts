import dayjs from "dayjs";
import { client } from "../../lib/prisma";

export class GenerateRefreshTokenProvider {
  async generate(user_id: string) {
    const expiresIn = dayjs().add(15, "seconds").unix();

    const refreshToken = await client.refreshToken.create({
      data: {
        user_id,
        expiresIn,
      },
    });

    return refreshToken;
  }
}
