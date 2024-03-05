import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/uploadPdf/multer.config';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadFile(@UploadedFile() file: any) {
    const filePath = file.path;
    const text = await this.pdfService.extractTextFromPdf(filePath);

    return { filename: file.filename, path: file.path, text };
  }

   // async getAiModelAnswer(text: string): Promise<GetChatCompletionAnswerOutputDTO> {
  //   this.chatHistory.addHumanMessage(text);
  //   const result = await this.chat.invoke(this.chatHistory.chatHistory);
  //   const aiMessageString = result.content?.toString(); // En supposant que "content" contient le message réel
  //   this.chatHistory.addAiMessage(aiMessageString);
  //   return GetChatCompletionAnswerOutputDTO.getInstance(aiMessageString);
  // }

  // async getAiModelAnswer(text: string, questionType: string): Promise<GetChatCompletionAnswerOutputDTO> {
  //   this.chatHistory.addHumanMessage(text);

  //   switch (questionType) {
  //     case 'pdf':
  
  //       break;
  //     case 'general':

  //       const generalResult = await this.chat.invoke(this.chatHistory.chatHistory);
  //       this.chatHistory.addAiMessage(generalResult.content?.toString());
  //       return GetChatCompletionAnswerOutputDTO.getInstance(generalResult.content?.toString());
  //     case 'reasoning':
  //       break;
  //     default:
  //       throw new Error('Type de question non pris en charge');
  //   }
  // }
}