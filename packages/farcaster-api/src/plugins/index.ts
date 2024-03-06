import fp from "fastify-plugin";
import { PrismaClient } from "@nook/common/prisma/farcaster";
import { ContentClient, FarcasterCacheClient } from "@nook/common/clients";

declare module "fastify" {
  interface FastifyInstance {
    farcaster: {
      client: PrismaClient;
    };
    content: {
      client: ContentClient;
    };
    cache: {
      client: FarcasterCacheClient;
    };
  }
}

export const farcasterPlugin = fp(async (fastify, opts) => {
  const client = new PrismaClient();
  await client.$connect();
  fastify.decorate("farcaster", { client });
  fastify.addHook("onClose", async (fastify) => {
    await fastify.farcaster.client.$disconnect();
  });
});

export const cachePlugin = fp(async (fastify, opts) => {
  const client = new FarcasterCacheClient();
  await client.connect();
  fastify.decorate("cache", { client });
  fastify.addHook("onClose", async (fastify) => {
    await fastify.cache.client.close();
  });
});

export const contentPlugin = fp(async (fastify, opts) => {
  const client = new ContentClient();
  await client.connect();
  fastify.decorate("content", { client });
  fastify.addHook("onClose", async (fastify) => {
    await fastify.content.client.close();
  });
});