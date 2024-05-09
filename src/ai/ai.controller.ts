import { Controller, Post, UploadedFile, UseInterceptors, Body, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../uploadPdf/multer.config';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';
import { AiService } from './ai.service';
  
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

    // Récupérer le texte du PDF s'il est uploaded
    if (file) {
      const filePath = file.path;
      text = await this.pdfService.extractTextFromPdf(filePath);
    } else {
      // Utiliser le message fourni si aucun fichier n'est téléchargé
      text = message;
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