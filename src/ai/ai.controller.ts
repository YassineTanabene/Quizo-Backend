import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { AiService } from './ai.service';
import { CreateAiDto } from './dto/create-ai.dto';
import { UpdateAiDto } from './dto/update-ai.dto';
import { GetChatCompletionAnswerInputDTO } from './model/chat-completion-answer.dto';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  create(@Body(new ValidationPipe({transform:true})) data:GetChatCompletionAnswerInputDTO ) {
    return this.aiService.getAiModelAnswer(data)
  }

  // @Get()
  // findAll() {
  //   return this.aiService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.aiService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAiDto: UpdateAiDto) {
  //   return this.aiService.update(+id, updateAiDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.aiService.remove(+id);
  // }
}
