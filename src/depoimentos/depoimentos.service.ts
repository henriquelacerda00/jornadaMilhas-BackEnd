import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';

@Injectable()
export class DepoimentosService {
  private readonly baseUrl = process.env.BASE_URL || 'http://localhost:8080';

  constructor(
    @InjectRepository(Depoimento)
    private repository: Repository<Depoimento>,
  ) {}

  create(createDepoimentoDto: CreateDepoimentoDto) {
    return this.repository.save(createDepoimentoDto);
  }

  async findAll() {
    const depoimentos = await this.repository.find();

    return depoimentos.map((dep) => ({
      ...dep,
      avatar: dep.avatar.startsWith('http')
        ? dep.avatar
        : `${this.baseUrl}/public/${dep.avatar}`,
    }));
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateDepoimentoDto: UpdateDepoimentoDto) {
    return this.repository.update(id, updateDepoimentoDto);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
