import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('quiz')
// @UseGuards(AuthGuard)
// @Roles(1,2)
export class QuizController { 

  constructor(private readonly quizService: QuizService) {}

 
  
//---------------------------------------------------Controller Create quiz with RPC method ---------------------------------------------------------------


  @Post('createQuiz')
  create(@Body() createQuizDto: CreateQuizDto) {

    return this.quizService.createCategory(createQuizDto);

  }


  
//---------------------------------------------------Controller update Quiz with RPC method ---------------------------------------------------------------
  

  @Put('updateQuiz/:idquiz')
  
  update(@Param('idquiz') idquiz: string, @Body() updateQuizDto: UpdateQuizDto) {
  
    return this.quizService.updateQuiz(idquiz, updateQuizDto);
  
  }


//---------------------------------------------------Controller find All Quizes with RPC method ---------------------------------------------------------------


  @Get('findallQuizes')

  findAll() {
    console.log("find all");

    return this.quizService.findAllQuizes();

  }


//---------------------------------------------------Controller find One Quiz with RPC method ---------------------------------------------------------------

@Get('findoneQuiz/:idquiz')

findOne(@Param('idquiz') idquiz: string) {

  return this.quizService.findOneQuiz(idquiz);

}



//---------------------------------------------------Controller delete Quiz with RPC method ---------------------------------------------------------------

  @Delete('deleteQuiz/:idquiz')

  remove(@Param('idquiz') idquiz: string) {

    return this.quizService.deleteQuiz(idquiz);

  }

}
