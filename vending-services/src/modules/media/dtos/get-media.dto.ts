import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Response } from 'express';
import { MediaEntity } from 'src/database/entities/media.entity';

export class GetMediaQueryParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class GetMediaResponse {
  constructor(media: MediaEntity, res: Response) {
    res.setHeader('Content-Type', media.fileType);
    res.setHeader('Content-Disposition', `inline;`);
    res.send(Buffer.from(media.data, 'base64'));
  }
}
