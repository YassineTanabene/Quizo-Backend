import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {

  constructor(private readonly supabaseService: SupabaseService){}

//---------------------------------------------------Service Create Question with RPC method ---------------------------------------------------------------


  async createQuestion(createQuestionDto: CreateQuestionDto):Promise<any>{

    const supabase = this.supabaseService.getClient();

    const {data: Question , error : CreateQuestionError} = await supabase
    .from('question')
    .insert([
      {
      id_quiz: createQuestionDto.id_quiz, 
      question_content : createQuestionDto.question_content, 
      explantation: createQuestionDto.explantation,
      questiontype: createQuestionDto.questiontype

    }]);
    if (CreateQuestionError){
      throw new Error(CreateQuestionError.message);
    }

    return console.log("🚀 ~ QuestionService ~ createQuestion ~ Question Successfully created !"),Question;
    
  }



//---------------------------------------------------Service update Question with RPC method ---------------------------------------------------------------


  async updateQuestion(idquestion: string, updateQuestionDto: UpdateQuestionDto):Promise<Question> {

    const supabase = this.supabaseService.getClient();

    const{ data : Question, error: QuestionUpdateError} = await supabase
    .from('question')
    .update([{
      id_quiz: updateQuestionDto.id_quiz, 
      question_content: updateQuestionDto.question_content,
      explantation : updateQuestionDto.explantation,
      questiontype: updateQuestionDto.questiontype

    }]).eq('id',idquestion)

    if (QuestionUpdateError){

      throw new Error(QuestionUpdateError.message);

    }

    
    return console.log("🚀 ~ QuestionService ~ updateQuestion ~ Question Successfully Updated !"),Question;
    
  }


//---------------------------------------------------Service find All Quiz Questions with RPC method ---------------------------------------------------------------


  async findAllQuizQuestions() {

    const supabase = this.supabaseService.getClient();

     const {data: AllQuestions, error : findAllQuizQuestionsError}= await supabase
     .from('question')
     .select('*')
     

     if (findAllQuizQuestionsError){

      throw new Error(findAllQuizQuestionsError.message)

     }
     
    return console.log("🚀 ~ QuestionService ~ findAllQuizQuestions ~ Questions are found successfully !"),AllQuestions;

    }

//---------------------------------------------------Service find One Question with RPC method ---------------------------------------------------------------

  async findOneQuestion(idquestion: string) {

    const supabase = this.supabaseService.getClient();

    const{data : Question, error: findOneQuestionError} = await supabase
    .from('question')
    .select()
    .eq('id',idquestion)

    if (findOneQuestionError){

      throw new Error(findOneQuestionError.message);
      
    }
    
    return console.log("🚀 ~ QuestionService ~ findOneQuestion ~ Question found !"), Question;

  }

  //---------------------------------------------------Service delete Question by id with RPC method ---------------------------------------------------------------


  async deleteQuestion(idquestion: string) {
    const supabase = this.supabaseService.getClient();
    const{data , error} = await supabase.from('question').delete().eq('id',idquestion)
    return  console.log("🚀 ~ QuestionService ~ deleteQuestion ~ Question deleted !"), data;
  }
}
