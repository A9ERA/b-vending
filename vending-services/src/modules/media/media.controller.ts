import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { MediaService } from './media.service';
import { GetMediaQueryParamDto, GetMediaResponse } from './dtos/get-media.dto';
import {
  CreateMediaRequestBodyDto,
  CreateMediaResponse,
} from './dtos/create-media.dto';
import {
  UpdateMediaPathParamDto,
  UpdateMediaRequestBodyDto,
  UpdateMediaResponse,
} from './dtos/update-media.dto';
import {
  DeleteMediaPathParamDto,
  DeleteMediaResponse,
} from './dtos/delete-media.dto';
import { Response } from 'express';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  async getMedia(@Query() { id }: GetMediaQueryParamDto, @Res() res: Response) {
    return new GetMediaResponse(await this.mediaService.getMedia(id), res);
  }

  @Post()
  async createMedia(@Body() body: CreateMediaRequestBodyDto) {
    return new CreateMediaResponse(await this.mediaService.createMedia(body));
  }

  @Patch(':id')
  async updateMedia(
    @Param() { id }: UpdateMediaPathParamDto,
    @Body() body: UpdateMediaRequestBodyDto,
  ) {
    return new UpdateMediaResponse(
      await this.mediaService.updateMedia(id, body),
    );
  }

  @Delete(':id')
  async deleteMedia(@Param() { id }: DeleteMediaPathParamDto) {
    return new DeleteMediaResponse(
      await this.mediaService.deleteMedia(id),
	);
  }
}
