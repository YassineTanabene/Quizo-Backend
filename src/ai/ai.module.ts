import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';

@Module({
  controllers: [AiController],
  providers: [AiService,PdfService],
})
export class AiModule {}
