import { AgendaEntity } from '../entities/agenda.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AgendasService } from './agendas.service';
import { AgendasController } from './agendas.controller';
import { ParticipanteEntity } from '../entities/participante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AgendaEntity, ParticipanteEntity])],
  providers: [AgendasService],
  controllers: [AgendasController],
})
export class AgendasModule {}
