import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaEntity } from 'src/database/entities/media.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    MediaEntity,
    ProductEntity,
  ])],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}
