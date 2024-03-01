import { Injectable } from '@nestjs/common';
import { ChatHistoryManager } from './model/chat-history-manager';
import { ChatOpenAI } from '@langchain/openai';
import { GetChatCompletionAnswerInputDTO, GetChatCompletionAnswerOutputDTO } from './model/chat-completion-answer.dto';

const DEFAULT_TEMPERATURE=1;
const DEFAULT_MODEL="gpt-3.5-turbo";
@Injectable()
export class AiService {
  private readonly chatHistory:ChatHistoryManager;
  private readonly chat:ChatOpenAI;

  constructor(){
    this.chatHistory=new ChatHistoryManager();
    this.chat=new ChatOpenAI ({
      temperature:DEFAULT_TEMPERATURE,
      openAIApiKey:'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',
      modelName:DEFAULT_MODEL,
    })
  }

  async getAiModelAnswer(data:GetChatCompletionAnswerInputDTO){
    this.chatHistory.addHumanMessage(data.message)
    const result = await this.chat.invoke(
      this.chatHistory.chatHistory,
    );
    const aiMessageString = result.content?.toString(); // Assuming 'content' holds the actual message
this.chatHistory.addAiMessage(aiMessageString);
return GetChatCompletionAnswerOutputDTO.getInstance(aiMessageString);

  }

  // create(createAiDto: CreateAiDto) {
  //   return 'This action adds a new ai';
  // }

  // findAll() {
  //   return `This action returns all ai`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} ai`;
  // }

  // update(id: number, updateAiDto: UpdateAiDto) {
  //   return `This action updates a #${id} ai`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} ai`;
  // }
}
