import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import MediaController from "../controllers/media.controller";

const mediaController = new MediaController();
async function mediaRoutes(server: FastifyInstance) {
  server.get(
    "/*",
    (
      request: FastifyRequest<{ Params: { "*": string } }>,
      reply: FastifyReply
    ) => mediaController.getRecordingHandler(request, reply)
  );

  server.get(
    "/path/*",
    (
      request: FastifyRequest<{ Params: { "*": string } }>,
      reply: FastifyReply
    ) => mediaController.getMediaFilePath(request, reply)
  );
}

export default mediaRoutes;
