import fastifyPlugin from "fastify-plugin";
import fastifyEnv, { FastifyEnvOptions } from "@fastify/env";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const envVariablesSchema = z.object({
  PORT: z.number(),
  HOST: z.string(),
  ORIGIN: z.string(),
  MEDIA_PATH: z.string(),
});

export default fastifyPlugin<FastifyEnvOptions>(
  async (fastify: FastifyInstance) => {
    fastify.register(fastifyEnv, {
      confKey: "config",
      schema: {
        type: "object",
        required: ["PORT", "HOST", "ORIGIN", "MEDIA_PATH"],
        properties: {
          PORT: { type: "number", default: 8081 },
          HOST: { type: "string", default: "localhost" },
          ORIGIN: { type: "string", default: "*" },
          MEDIA_PATH: { type: "string", default: "" },
        },
      },
      dotenv: true,
    });
  }
);

export type EnvironmentVariables = z.infer<typeof envVariablesSchema>;
