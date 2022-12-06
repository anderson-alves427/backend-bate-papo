import { AgendaEntity } from './agenda.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'participante' })
export class ParticipanteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'token', nullable: false })
  token: string;

  @Column({ name: 'created_by', nullable: false })
  created_by: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @ManyToOne(() => AgendaEntity, (agendaEntity) => agendaEntity.participante)
  agenda: AgendaEntity;
}
