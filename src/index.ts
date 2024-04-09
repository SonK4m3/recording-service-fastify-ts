import fastify, { errorCodes } from "fastify";
import routes from "./routes";
import corsPlugin from "./plugins/cors.plugin";
import envPlugin, { EnvironmentVariables } from "./plugins/env.plugin";
import dotenv from "dotenv";
dotenv.config();

export const server = fastify({
  logger: false,
});

declare module "fastify" {
  export interface FastifyInstance {
    config: EnvironmentVariables;
  }

  interface FastifyContextConfig {
    allowedRoles?: string[];
  }
}

// plugins
server.register(corsPlugin, {
  origin: [String(process.env.ORIGIN)],
  methods: ["GET"],
});
server.register(envPlugin);

server.setErrorHandler((error, request, reply) => {
  if (error instanceof errorCodes.FST_ERR_BAD_STATUS_CODE) {
    server.log.error(error);
    reply.status(500).send({ message: "Server internal error!" });
  } else {
    reply.send(error);
  }
});

server.get("/", (request, reply) => {
  reply.status(200).send("Hello world!");
});

server.register(routes, { prefix: "/api" });

const PORT = Number(process.env.PORT) || 8081;
const HOST = process.env.HOST || "localhost";

server.listen({ port: PORT, host: HOST }, (err, address) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log(`Server listening on ${address}`);
});
