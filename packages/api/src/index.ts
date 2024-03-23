import fastify from "fastify";
import { redisPlugin, nookPlugin } from "./plugins";
import { nookRoutes } from "./routes/nook";
import { userRoutes } from "./routes/user";
import fastifyJwt from "@fastify/jwt";
import { farcasterRoutes } from "./routes/farcaster";
import { farcasterSignerRoutes } from "./routes/farcaster/signer";
import { frameRoutes } from "./routes/frames";
import { contentRoutes } from "./routes/content";
import { notificationsRoutes } from "./routes/notifications";
import { transactionRoutes } from "./routes/transactions";
import { flagRoutes } from "./routes/flags";

const buildApp = () => {
  const app = fastify({
    logger: true,
    ajv: {
      customOptions: {
        allowUnionTypes: true,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: Automatically convert BigInts to strings when serializing to JSON
  BigInt.prototype.toJSON = function () {
    return this.toString();
  };

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET as string,
  });

  app.register(nookPlugin);
  app.register(redisPlugin);

  app.register(contentRoutes, { prefix: "/v0" });
  app.register(nookRoutes, { prefix: "/v0" });
  app.register(userRoutes, { prefix: "/v0" });
  app.register(farcasterRoutes, { prefix: "/v0" });
  app.register(farcasterSignerRoutes, { prefix: "/v0" });
  app.register(frameRoutes, { prefix: "/v0" });
  app.register(transactionRoutes, { prefix: "/v0" });
  app.register(notificationsRoutes, { prefix: "/v0" });
  app.register(flagRoutes, { prefix: "/v0" });

  return app;
};

const start = async () => {
  const app = buildApp();
  try {
    const port = Number(process.env.PORT || "3000");
    await app.listen({ port, host: "0.0.0.0" });
    console.log(`Listening on :${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start().catch((e) => {
  console.error(e);
  process.exit(1);
});
