import { ParticipanteEntity } from './participante.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'agenda' })
export class AgendaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'session_id', nullable: false })
  session_id: string;

  @Column({ name: 'api_key', nullable: false })
  api_key: string;

  @Column({ name: 'created_by', nullable: false })
  created_by: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: string;

  @CreateDateColumn({ name: 'updated_at' })
  updated_at: string;

  @OneToMany(
    () => ParticipanteEntity,
    (participanteEntity) => participanteEntity.agenda,
  )
  participante: AgendaEntity[];
}
