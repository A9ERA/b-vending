import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { MediaService } from './media.service';
import { GetMediaQueryParamDto } from './dtos/get-media.dto';
import { CreateMediaRequestBodyDto } from './dtos/create-media.dto';
import { UpdateMediaPathParamDto, UpdateMediaRequestBodyDto } from './dtos/update-media.dto';
import { DeleteMediaPathParamDto } from './dtos/delete-media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  getMedia(
    @Query() query: GetMediaQueryParamDto,
	): string {
    console.log(query);
    return 'hello';
  }

  @Post()
  createMedia(
    @Body() body: CreateMediaRequestBodyDto,
  ): string {
		console.log(body);
    return 'hello';
  }

	@Patch(':id')
	updateMedia(
		@Param() param: UpdateMediaPathParamDto,
		@Body() body: UpdateMediaRequestBodyDto,
	): void {
		console.log('param: ', param);
		console.log('body: ', body);
		

	}

	@Delete(':id')
	deleteMedia(
		@Param() param: DeleteMediaPathParamDto,
	): void {
		console.log('param: ', param);
	
	}

}
