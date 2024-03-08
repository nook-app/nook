import { FastifyInstance } from "fastify";
import {
  AppClient as FarcasterAuthClient,
  createAppClient,
  viemConnector,
} from "@farcaster/auth-client";
import { SignInWithFarcasterRequest, TokenResponse } from "../../types";
import { PrismaClient } from "@nook/common/prisma/nook";

export class UserService {
  private farcasterAuthClient: FarcasterAuthClient;
  private jwt: FastifyInstance["jwt"];
  private nookClient: PrismaClient;

  constructor(fastify: FastifyInstance) {
    this.jwt = fastify.jwt;
    this.farcasterAuthClient = createAppClient({
      ethereum: viemConnector(),
    });
    this.nookClient = fastify.nook.client;
  }

  async signInWithFarcaster(
    request: SignInWithFarcasterRequest,
  ): Promise<TokenResponse | undefined> {
    const verifyResult = await this.farcasterAuthClient.verifySignInMessage({
      domain: process.env.SIWF_DOMAIN || "localhost:3000",
      ...request,
    });

    if (verifyResult.isError) {
      throw new Error(verifyResult.error?.message || "Sign in failed");
    }

    const fid = verifyResult.fid.toString();
    let user = await this.nookClient.user.findFirst({
      where: {
        fid,
      },
    });
    if (!user) {
      const refreshToken = this.jwt.sign({
        fid,
      });
      const date = new Date();
      user = await this.nookClient.user.create({
        data: {
          fid,
          signedUpAt: date,
          loggedInAt: date,
          refreshToken,
        },
      });
    }

    const expiresIn = 60 * 60 * 24 * 7;
    const expiresAt = Math.floor(new Date().getTime() / 1000) + expiresIn;
    const token = this.jwt.sign(
      {
        fid,
      },
      { expiresIn },
    );

    return {
      fid,
      token,
      refreshToken: user.refreshToken,
      expiresAt,
    };
  }

  async getToken(refreshToken: string): Promise<TokenResponse | undefined> {
    const { fid } = this.jwt.verify(refreshToken) as { fid: string };
    const user = await this.nookClient.user.findFirst({
      where: {
        fid,
      },
    });
    if (!user) {
      return;
    }

    if (user.refreshToken !== refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const expiresIn = 60 * 60 * 24 * 7;
    const expiresAt = Math.floor(new Date().getTime() / 1000) + expiresIn;
    const token = this.jwt.sign(
      {
        fid: user.fid,
      },
      { expiresIn },
    );

    return {
      fid,
      refreshToken,
      token,
      expiresAt,
    };
  }
}
