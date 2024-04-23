import fastify, { FastifyReply, FastifyRequest } from "fastify";
import MediaService from "../services/media.services";

const mediaService: MediaService = new MediaService();

class MediaController {
  constructor() {}

  async getMediaFilePath(
    request: FastifyRequest<{
      Params: { "*": string };
      Querystring: {
        path: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const path = request.query.path;
    const filename = request.params["*"];

    if (path !== undefined) {
      const mediaStoragePath = path + "/" + filename.split("/").reverse()[0];

      reply.status(200).send({
        path: path,
        mediaStoragePath: mediaStoragePath,
      });
    }

    const storagePath = request.server.config.MEDIA_PATH;
    const mediaStoragePath = mediaService.getMediaStoragePath(
      storagePath,
      filename
    );

    reply.status(200).send({
      mediaStoragePath: mediaStoragePath,
    });
  }

  async getRecordingHandler(
    request: FastifyRequest<{
      Params: { "*": string };
      Querystring: {
        path: string;
      };
    }>,
    reply: FastifyReply
  ) {
    const path = request.query.path;
    const filename = request.params["*"];
    const storagePath = request.server.config.MEDIA_PATH;
    let mediaStoragePathName = "";

    if (path !== undefined) {
      mediaStoragePathName = path + "/" + filename.split("/").reverse()[0];
    } else {
      mediaStoragePathName = mediaService.getMediaStoragePath(
        storagePath,
        filename
      );
    }

    const fileStream = await mediaService.getWavFile(mediaStoragePathName);

    reply.type("audio/wav").send(fileStream);
  }
}

export default MediaController;
