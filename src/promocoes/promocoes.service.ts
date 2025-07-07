import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Promocao } from './entities/promocao.entity';
import { CreatePromocoeDto } from './dto/create-promocoe.dto';
import { UpdatePromocoeDto } from './dto/update-promocoe.dto';

@Injectable()
export class PromocoesService {
  private readonly baseUrl = process.env.BASE_URL || 'http://localhost:8080';

  constructor(
    @InjectRepository(Promocao)
    private readonly repository: Repository<Promocao>,
  ) {}

  async create(createPromocoeDto: CreatePromocoeDto) {
    return this.repository.save(createPromocoeDto);
  }

  async findAll(): Promise<Promocao[]> {
    const promocoes = await this.repository.find();

    return promocoes.map((promo) => ({
      ...promo,
      imagem: `${this.baseUrl}/public/${promo.imagem}`,
    }));
  }

  async findOne(id: number): Promise<Promocao | null> {
    const promo = await this.repository.findOneBy({ id });

    if (!promo) return null;

    return {
      ...promo,
      imagem: `${this.baseUrl}/public/${promo.imagem}`,
    };
  }

  async update(id: number, updatePromocoeDto: UpdatePromocoeDto) {
    return this.repository.update(id, updatePromocoeDto);
  }

  async remove(id: number) {
    return this.repository.delete(id);
  }
}
