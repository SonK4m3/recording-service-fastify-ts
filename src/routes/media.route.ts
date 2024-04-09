import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import MediaController from "../controllers/media.controller";

const mediaController = new MediaController();
async function mediaRoutes(server: FastifyInstance) {
  server.get(
    "/:filename",
    (
      request: FastifyRequest<{ Params: { filename: string } }>,
      reply: FastifyReply
    ) => mediaController.getRecordingHandler(request, reply)
  );

  server.get(
    "/path/:filename",
    (
      request: FastifyRequest<{ Params: { filename: string } }>,
      reply: FastifyReply
    ) => mediaController.getMediaFilePath(request, reply)
  );
}

export default mediaRoutes;
