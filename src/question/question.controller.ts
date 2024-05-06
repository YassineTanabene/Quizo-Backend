import { Controller, Get, Post, Body, Patch, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';

@Controller('question')
// @UseGuards(AuthGuard,RolesGuard)
// @Roles(1,2)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  //---------------------------------------------------Service Create Question with RPC method ---------------------------------------------------------------

  @Post('createQuestion')
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestions(createQuestionDto);
  }

  //---------------------------------------------------Service update Question with RPC method ---------------------------------------------------------------

    @Put('updateQuestion/:idquestion')
    update(@Param('idquestion') idquestion: string, @Body() updateQuestionDto: UpdateQuestionDto) {
      return this.questionService.updateQuestion(idquestion, updateQuestionDto);
    }
  
  //---------------------------------------------------Service find all quiz questions Question with RPC method ---------------------------------------------------------------

  // @Get('findallQuizQuestions')
  // findAllQuizQuestions() {
  //   return this.questionService.findAllQuizQuestions();
  // }

  //---------------------------------------------------Service find one Question with RPC method ---------------------------------------------------------------

  // @Get('findoneQuestion/:idquestion')
  // findOne(@Param('idquestion') idquestion: string) {
  //   return this.questionService.findOneQuestion(idquestion);
  // }

  //---------------------------------------------------Service delete Question with RPC method ---------------------------------------------------------------

  @Delete('deleteQuestion/:idquestion')
  remove(@Param('idquestion') idquestion: string) {
    return this.questionService.deleteQuestion(idquestion);
  }


  //---------------------------------------------------Service find one Question with RPC method ---------------------------------------------------------------

  @Get('findoneQuestion/:idquestion')
  findOne(@Param('idquestion') idquestion: string) {
    return this.questionService.findQuestionById(idquestion);
  }


  @Get('findallQuizQuestions/:idquiz')
  async findAllQuizQuestions(@Param('idquiz') idquiz: string) {
    try {
      const questionData = await this.questionService.findQuestionsByQuizId(idquiz);
      return questionData;
    } catch (error) {
      console.error('Error fetching all quiz questions:', error);
      throw new Error('Failed to fetch all quiz questions');
    }
  }
}
