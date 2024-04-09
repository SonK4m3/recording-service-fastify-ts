import fs from "fs";
import { WavFile } from "../validators/wav.schema";
import path from "path";

class MediaService {
  constructor(private readonly storagePath: string) {}

  //   async uploadWavFile(file: any): Promise<WavFile> {
  //     const filename = `${uuidv4()}.wav`;
  //     const filePath = path.join(this.mediaStoragePath, filename);

  //     await fs.promises.writeFile(filePath, file.buffer);

  //     return { id: uuidv4(), filename };
  //   }

  static getMediaFilePath(filename: string): string {
    return path.resolve(__dirname, "media", filename); // Assumes media files are stored in the 'media' directory
  }

  getMediaStoragePath(filename: string): string {
    return path.join(this.storagePath, filename);
  }

  async getWavFile(filename: string): Promise<Buffer> {
    const filePath = path.join(this.storagePath, filename);

    const fileStream = fs.readFileSync(filePath);
    return fileStream;
  }
}

export default MediaService;
