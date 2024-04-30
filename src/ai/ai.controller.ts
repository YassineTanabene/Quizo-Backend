// import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
// import { AiService } from './ai.service';
// import { CreateAiDto } from './dto/create-ai.dto';
// import { UpdateAiDto } from './dto/update-ai.dto';
// import { GetChatCompletionAnswerInputDTO } from './model/chat-completion-answer.dto';

// @Controller('ai')
// export class AiController {
//   constructor(private readonly aiService: AiService) {}

//   @Post()
//   create(@Body(new ValidationPipe({transform:true})) data:GetChatCompletionAnswerInputDTO ) {
//     return this.aiService.getAiModelAnswer(data)
//   }


// }

import { Controller, Post, UploadedFile, UseInterceptors, Body, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AiService } from './ai.service';
import { multerConfig } from '../uploadPdf/multer.config';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';

@Controller('ai')
export class AiController {
  constructor(
    private readonly aiService: AiService, 
    private readonly pdfService: PdfService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async handleRequest(
    @UploadedFile() file: any,
    @Body('message') message: string,
    @Body('questionType') questionType: string
  ) {
    let text = '';

    // Récupérer le texte du PDF s'il est téléchargé
    if (file) {
      const filePath = file.path;
      text = await this.pdfService.extractTextFromPdf(filePath);
    } else {
      // Utiliser le message fourni si aucun fichier n'est téléchargé
     return 'Please  provide a file ';
    }

    // Envoyer le texte extrait ou le message fourni au service AI
    const aiResponse = await this.aiService.getAiModelAnswer(text, message, questionType);
    
    return {
      filename: file?.filename, 
      message, // Ajouter le message fourni à la réponse
      aiResponse,
    }; 
  }
}



