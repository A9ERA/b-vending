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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiOperation({ summary: 'Get media' })
  @ApiResponse({
    status: 200,
    description: 'Download the binary file',
    content: {
      'application/octet-stream': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async getMedia(@Query() { id }: GetMediaQueryParamDto, @Res() res: Response) {
    return new GetMediaResponse(await this.mediaService.getMedia(id), res);
  }

  @Post()
  @ApiOperation({ summary: 'Create media' })
  @ApiResponse({
    status: 200,
    type: CreateMediaResponse,
    example: {
      data: {
        id: '1',
        fileType: 'image/png',
        data: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAY.....',
        productId: '1',
        createdAt: '2024-12-01T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z',
        deletedAt: null,
      },
    },
  })
  async createMedia(@Body() body: CreateMediaRequestBodyDto) {
    return new CreateMediaResponse(await this.mediaService.createMedia(body));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update media' })
  @ApiResponse({
    status: 200,
    type: UpdateMediaResponse,
    example: {
      data: {
        id: '1',
        fileType: 'image/png',
        data: 'iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAY.....',
        productId: '1',
        createdAt: '2024-12-01T00:00:00.000Z',
        updatedAt: '2024-12-01T00:00:00.000Z',
        deletedAt: null,
      },
    },
  })
  async updateMedia(
    @Param() { id }: UpdateMediaPathParamDto,
    @Body() body: UpdateMediaRequestBodyDto,
  ) {
    return new UpdateMediaResponse(
      await this.mediaService.updateMedia(id, body),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete media' })
  @ApiResponse({
    status: 200,
    type: DeleteMediaResponse,
    example: {
      data: {
        success: true,
      },
    },
  })
  async deleteMedia(@Param() { id }: DeleteMediaPathParamDto) {
    return new DeleteMediaResponse(await this.mediaService.deleteMedia(id));
  }
}
