import { Controller, Get, Post, Body, Patch, Param, Put, Delete } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  //---------------------------------------------------Service Create Question with RPC method ---------------------------------------------------------------

  @Post('createquestion')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  //---------------------------------------------------Service update Question with RPC method ---------------------------------------------------------------

    @Put('updatequestion/:idquestion')
    update(@Param('idquestion') idquestion: string, @Body() updateQuestionDto: UpdateQuestionDto) {
      return this.questionService.updateQuestion(idquestion, updateQuestionDto);
    }
  
  //---------------------------------------------------Service find all quiz questions Question with RPC method ---------------------------------------------------------------

  @Get('findallquizquestions')
  findAllQuizQuestions() {
    return this.questionService.findAllQuizQuestions();
  }

  //---------------------------------------------------Service find one Question with RPC method ---------------------------------------------------------------

  @Get('findonequestion/:idquestion')
  findOne(@Param('idquestion') idquestion: string) {
    return this.questionService.findOneQuestion(idquestion);
  }

  //---------------------------------------------------Service delete Question with RPC method ---------------------------------------------------------------

  @Delete('deletequestion/:idquestion')
  remove(@Param('idquestion') idquestion: string) {
    return this.questionService.deleteQuestion(idquestion);
  }
}
