import { FastifyInstance } from "fastify";
import { FarcasterAPIClient } from "@nook/common/clients";

export const farcasterRoutes = async (fastify: FastifyInstance) => {
  fastify.register(async (fastify: FastifyInstance) => {
    const client = new FarcasterAPIClient();

    fastify.get<{ Params: { hash: string } }>(
      "/farcaster/casts/:hash",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getCast(request.params.hash, viewerFid);
        reply.send(response);
      },
    );

    fastify.get<{ Params: { hash: string } }>(
      "/farcaster/casts/:hash/replies",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getCastReplies(
          request.params.hash,
          viewerFid,
        );
        reply.send(response);
      },
    );

    fastify.get<{ Params: { fid: string } }>(
      "/farcaster/users/:fid",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getUser(request.params.fid, viewerFid);
        reply.send(response);
      },
    );

    fastify.get<{ Params: { fid: string }; Querystring: { cursor: number } }>(
      "/farcaster/users/:fid/casts",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getCastsByFids(
          {
            fids: [request.params.fid],
            replies: false,
            maxCursor: request.query.cursor,
          },
          viewerFid,
        );
        reply.send(response);
      },
    );

    fastify.get<{ Params: { fid: string }; Querystring: { cursor: number } }>(
      "/farcaster/users/:fid/replies",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getCastsByFids(
          {
            fids: [request.params.fid],
            replies: true,
            maxCursor: request.query.cursor,
          },
          viewerFid,
        );
        reply.send(response);
      },
    );

    fastify.get<{ Params: { id: string }; Querystring: { cursor: number } }>(
      "/farcaster/channels/:id/casts",
      async (request, reply) => {
        let viewerFid: string | undefined;
        try {
          const { fid } = (await request.jwtDecode()) as { fid: string };
          viewerFid = fid;
        } catch (e) {}
        const response = await client.getCastsByChannel(
          {
            id: request.params.id,
            replies: false,
            maxCursor: request.query.cursor,
          },
          viewerFid,
        );
        reply.send(response);
      },
    );
  });
};