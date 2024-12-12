import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CashEntity } from 'src/database/entities/cash.entity';
import { Repository } from 'typeorm';
import { GetCashQueryParamDto } from './dtos/get-cash.dto';
import {
  UpdateCashPathParamDto,
  UpdateCashRequestBodyDto,
} from './dtos/update-cash.dto';

@Injectable()
export class CashService {
  constructor(
    @InjectRepository(CashEntity)
    private readonly cashRepository: Repository<CashEntity>,
  ) {}

  async getCashes() {
    return this.cashRepository.find();
  }

  async getCashById(id: GetCashQueryParamDto['id']) {
    return this.cashRepository.find({ where: { id } });
  }

  async updateCash(
    id: UpdateCashPathParamDto['id'],
    body: UpdateCashRequestBodyDto,
  ) {
    const cash = await this.cashRepository.findOne({ where: { id } });
    if (!cash) {
      throw new NotFoundException('Cash not found');
    }

    cash.quantity = body.quantity ?? cash.quantity;

    return this.cashRepository.save(cash);
  }
}
