import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Controller('quiz')
export class QuizController {

  constructor(private readonly quizService: QuizService) {}


  
//---------------------------------------------------Controller Create quiz with RPC method ---------------------------------------------------------------


  @Post('createquiz')
  create(@Body() createQuizDto: CreateQuizDto) {

    return this.quizService.createCategory(createQuizDto);

  }


  
//---------------------------------------------------Controller update Quiz with RPC method ---------------------------------------------------------------
  

  @Put('update/:idquiz')
  
  update(@Param('idquiz') idquiz: string, @Body() updateQuizDto: UpdateQuizDto) {
  
    return this.quizService.updateQuiz(idquiz, updateQuizDto);
  
  }


//---------------------------------------------------Controller find All Quizes with RPC method ---------------------------------------------------------------


  @Get('findallquizes')

  findAll() {

    return this.quizService.findAllQuizes();

  }


//---------------------------------------------------Controller find One Quiz with RPC method ---------------------------------------------------------------

  @Get('findonequiz/:idquiz')

  findOne(@Param('idquiz') idquiz: string) {

    return this.quizService.findOneQuiz(idquiz);

  }


//---------------------------------------------------Controller delete Quiz with RPC method ---------------------------------------------------------------

  @Delete('delete/:idquiz')

  remove(@Param('idquiz') idquiz: string) {

    return this.quizService.deleteQuiz(idquiz);

  }

}
