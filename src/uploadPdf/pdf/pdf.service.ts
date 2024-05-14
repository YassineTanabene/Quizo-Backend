import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as PDFParser from 'pdf-parse';

@Injectable()
export class PdfService {

  async extractTextFromPdf(filePath: string): Promise<string> {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await PDFParser(dataBuffer);
    return data.text;
  }
} 
  