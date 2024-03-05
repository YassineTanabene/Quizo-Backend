import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';
import { multerConfig } from 'src/uploadPdf/multer.config';

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
}