import { SaveParticipanteDTO } from './dto/save-participante.dto';
import { ISaveAgendaSession } from './interface/save-agenda-session.interface';
import { SaveAgendaDTO } from './dto/save-agenda.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AgendaEntity } from '../entities/agenda.entity';
import * as OpenTok from 'opentok';
import { ParticipanteEntity } from '../entities/participante.entity';

@Injectable()
export class AgendasService {
  private opentok: OpenTok;

  constructor(
    @InjectRepository(AgendaEntity)
    private readonly agendaRepository: Repository<AgendaEntity>,
    @InjectRepository(ParticipanteEntity)
    private readonly participanteEntity: Repository<ParticipanteEntity>,
  ) {
    this.opentok = new OpenTok(
      process.env.VONAGE_API_KEY,
      process.env.VONAGE_SECRET,
    );
  }

  createSession(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.opentok.createSession({}, (err, session) => {
        if (err) reject(err);

        resolve(session);
      });
    });
  }

  async saveToken(
    session_id: string,
    created_by: string,
    agenda: AgendaEntity,
  ): Promise<string> {
    const options = {
      data: `username=${created_by}`,
      expireTime: new Date().getTime() / 1000 + 24 * 60 * 60,
    };

    const token = this.opentok.generateToken(session_id, options);

    const saveParticipante = {
      token: token,
      created_by: created_by,
      agenda: agenda,
    };
    const payloadSaveParticipante = await this.participanteEntity.save(
      this.participanteEntity.create(saveParticipante),
    );

    return payloadSaveParticipante.token;
  }

  async save(data: SaveAgendaDTO): Promise<any> {
    const session = await this.createSession();

    const data_save_agenda: ISaveAgendaSession = {
      session_id: session.sessionId,
      created_by: 'Teste',
      api_key: session.ot.apiKey,
    };

    const payloadSaveAgenda = await this.agendaRepository.save(
      this.agendaRepository.create(data_save_agenda),
    );

    if (payloadSaveAgenda) {
      const token = await this.saveToken(
        session.sessionId,
        data_save_agenda.created_by,
        payloadSaveAgenda,
      );

      return {
        success: true,
        token: token,
        sessionId: session.sessionId,
      };
    }

    return {
      sucess: false,
      token: '',
      sessionId: '',
    };
  }

  async saveParticipante(data: SaveParticipanteDTO): Promise<any> {
    const agenda = await this.agendaRepository.find({
      where: { session_id: data.session_id },
    });

    if (!agenda.length) {
      throw new Error('Sessão não encontrada');
    }

    const token = await this.saveToken(
      data.session_id,
      data.created_by,
      agenda[0],
    );

    return {
      sucess: true,
      token: token,
      sessionId: agenda[0].session_id,
    };
  }
}
