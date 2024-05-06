import { Module } from '@nestjs/common';
import { ChatCompletionApiService } from './chat-completion-api.service';
import { ChatCompletionApiController } from './chat-completion-api.controller';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';

@Module({
  providers: [ChatCompletionApiService,PdfService],
  controllers: [ChatCompletionApiController]
})
export class ChatCompletionApiModule {}
