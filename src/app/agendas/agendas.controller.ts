import { SaveParticipanteDTO } from './dto/save-participante.dto';
import { SaveAgendaDTO } from './dto/save-agenda.dto';
import { AgendasService } from './agendas.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('agendas')
export class AgendasController {
  constructor(private readonly agendasService: AgendasService) {}

  @Post()
  async save(@Body() body: SaveAgendaDTO) {
    return this.agendasService.save(body);
  }

  @Post('teste')
  async saveParticipante(@Body() body: SaveParticipanteDTO) {
    return this.agendasService.saveParticipante(body);
  }
}
