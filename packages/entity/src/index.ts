import fastify from "fastify";
import { entityPlugin, redisPlugin } from "./plugins";
import { entityRoutes } from "./routes/entity";

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

  app.register(entityPlugin);
  app.register(redisPlugin);

  app.register(entityRoutes);

  return app;
};

const start = async () => {
  const app = buildApp();
  try {
    const port = Number(process.env.PORT || "3002");
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
