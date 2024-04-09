import fastify, { FastifyReply, FastifyRequest } from "fastify";
import MediaService from "../services/media.services";

const mediaService: MediaService = new MediaService();

class MediaController {
  constructor() {}

  async getMediaFilePath(
    request: FastifyRequest<{ Params: { filename: string } }>,
    reply: FastifyReply
  ) {
    const filename = request.params.filename;
    const storagePath = request.server.config.MEDIA_PATH;
    const mediaFilePath = MediaService.getMediaFilePath(filename);
    const mediaStoragePath = mediaService.getMediaStoragePath(
      storagePath,
      filename
    );

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
    const storagePath = request.server.config.MEDIA_PATH;
    const mediaStoragePathName = mediaService.getMediaStoragePath(
      storagePath,
      filename
    );

    const fileStream = await mediaService.getWavFile(mediaStoragePathName);

    reply.type("audio/wav").send(fileStream);
  }
}

export default MediaController;
