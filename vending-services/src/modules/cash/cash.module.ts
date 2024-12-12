import { Module } from '@nestjs/common';
import { CashController } from './cash.controller';
import { CashService } from './cash.service';
import { CashEntity } from 'src/database/entities/cash.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    CashEntity
  ])],
  controllers: [CashController],
  providers: [CashService]
})
export class CashModule {}
