import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { Response } from 'express';
import { MediaEntity } from 'src/database/entities/media.entity';

export class GetMediaQueryParamDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The media id to be download',
    example: 'b4a0a4c3-0b5d-4e8b-8d5c-1d6f8b4b0c4b',
  })
  id: string;
}

export class GetMediaResponse {
  constructor(media: MediaEntity, res: Response) {
    res.setHeader('Content-Type', media.fileType);
    res.setHeader('Content-Disposition', `inline;`);
    res.send(Buffer.from(media.data, 'base64'));
  }
}
