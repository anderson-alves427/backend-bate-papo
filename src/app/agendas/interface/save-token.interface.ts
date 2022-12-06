import { AgendaEntity } from 'src/app/entities/agenda.entity';

export interface ISaveToken {
  session_id: string;
  created_by: string;
  agenda: AgendaEntity[];
}
