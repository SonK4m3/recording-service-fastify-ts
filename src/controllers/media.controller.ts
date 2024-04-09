import { FastifyReply, FastifyRequest } from "fastify";
import MediaService from "../services/media.services";

const filePath = String(process.env.MEDIA_PATH || "");
const mediaService: MediaService = new MediaService(filePath);

class MediaController {
  constructor() {}

  async getMediaFilePath(
    request: FastifyRequest<{ Params: { filename: string } }>,
    reply: FastifyReply
  ) {
    const filename = request.params.filename;
    const mediaFilePath = MediaService.getMediaFilePath(filename);
    const mediaStoragePath = mediaService.getMediaStoragePath(filename);

    reply.status(200).send({
      mediaFilePath: mediaFilePath,
      mediaStoragePath: mediaStoragePath,
    });
  }

  async getRecordingHandler(
    request: FastifyRequest<{ Params: { filename: string } }>,
    reply: FastifyReply
  ) {
    const filename = request.params.filename;
    const fileStream = await mediaService.getWavFile(filename);

    reply.type("audio/wav").send(fileStream);
  }
}

export default MediaController;
