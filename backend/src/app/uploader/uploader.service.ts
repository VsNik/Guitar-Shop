import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import { extension } from 'mime-types';
import { ensureDir, remove } from 'fs-extra';
import { writeFile } from 'node:fs/promises';

@Injectable()
export class UploaderService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  public async upload(file: Express.Multer.File): Promise<string> {
    const uploadDirectory = this.configService.get('UPLOAD_DIRECTORY_PATH');

    const uuid = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${uuid}.${fileExtension}`;
    const destinationFile = `${uploadDirectory}/${hashName}`

    await ensureDir(uploadDirectory);
    await writeFile(destinationFile, Buffer.from(file.buffer));

    return hashName;
  }

  public async delete(filePath: string): Promise<void> {
    const uploadDirectory = this.configService.get('UPLOAD_DIRECTORY_PATH');
    await remove(`${uploadDirectory}/${filePath}`);
  }
}
