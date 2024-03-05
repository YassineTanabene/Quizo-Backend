import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';

@Controller('answer')
@UseGuards(AuthGuard,RolesGuard)
@Roles(1,2)
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  //---------------------------------------------------Service Create Answer with RPC method ---------------------------------------------------------------

  @Post('createanswer')
  create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(createAnswerDto);
  }
  
  //---------------------------------------------------Service find all question Answers with RPC method ---------------------------------------------------------------

  @Get('findallanswers/:id_question')
  findAll(@Param('id_question') id_question: string) {
    return this.answerService.findAllQuestionAnswers(id_question);
  }

  //---------------------------------------------------Service find one Answer with RPC method ---------------------------------------------------------------

  @Get('findoneanswer/:id')
  findOne(@Param('id') id: string) {
    return this.answerService.findOneAnswer(id);
  }

  //---------------------------------------------------Service update Answer with RPC method ---------------------------------------------------------------

  @Put('updateAnswer/:id')
  update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.updateAnswer(id, updateAnswerDto);
  }

  //---------------------------------------------------Service delete one Answer with RPC method ---------------------------------------------------------------

  @Delete('deleteanswer/:id')
  remove(@Param('id') id: string) {
    return this.answerService.deleteAnswer(id);
  }
  
}
