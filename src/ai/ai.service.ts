import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import { ChatOpenAI } from '@langchain/openai';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';
import { PdfService } from 'src/uploadPdf/pdf/pdf.service';

const DEFAULT_TEMPERATURE=1;
const DEFAULT_MODEL="gpt-3.5-turbo";
@Injectable()    
export class AiService {
  private readonly chatHistory:ChatHistoryManager;
  private readonly chat:ChatOpenAI;

  constructor(private readonly pdfService: PdfService){
    this.chatHistory=new ChatHistoryManager();
    this.chat=new ChatOpenAI ({
      temperature:DEFAULT_TEMPERATURE,
      openAIApiKey:'sk-proj-FMF4VpMHx6Uyy3PAj6w3T3BlbkFJWHgnLFcwA6ldC0wJ3V5M',
      modelName:DEFAULT_MODEL,
    }) 
  }



async getAiModelAnswer(message: string, originalMessage: string, questionType: string): Promise<GetChatCompletionAnswerOutputDTO> {
  this.chatHistory.addHumanMessage(originalMessage);
  this.chatHistory.addHumanMessage(message);


  switch (questionType) {
    case 'pdf':
      const result = await this.chat.invoke(
              this.chatHistory.chatHistory,
            );      const aiMessageString = result.content?.toString();
      this.chatHistory.addAiMessage(aiMessageString);
      return GetChatCompletionAnswerOutputDTO.getInstance(aiMessageString);
    case 'general':
      const generalResult = await this.chat.invoke(this.chatHistory.chatHistory);
      this.chatHistory.addAiMessage(generalResult.content?.toString());
      return GetChatCompletionAnswerOutputDTO.getInstance(generalResult.content?.toString());
    default:
      throw new Error('Type de question non pris en charge');
  }
}

}
