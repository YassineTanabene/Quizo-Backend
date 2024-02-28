import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswerService {

  constructor(private readonly supabaseService: SupabaseService){}


//---------------------------------------------------Service Create Question with RPC method ---------------------------------------------------------------


 async createAnswer(createAnswerDto: CreateAnswerDto):Promise<any>{

  const supabase = this.supabaseService.getClient();

  const {data: Answer , error : AnswerCreationError} = await supabase
  .from('answer')
  .insert([
    {
    id_question: createAnswerDto.id_question, 
    content : createAnswerDto.content,
    iscorrect:createAnswerDto.iscorrect,

  }]);

  if (AnswerCreationError){

    throw new Error(AnswerCreationError.message);
  }

  return console.log("🚀 ~ AnswerService ~ createAnswer ~ Answer Successfully created !"),Answer;
  
}



//---------------------------------------------------Service update Question with RPC method ---------------------------------------------------------------


async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto):Promise<Answer> {

  const supabase = this.supabaseService.getClient();

  const{ data : Answer, error:  AnswerUpdateError} = await supabase
  .from('answer')
  .update([{
    id_question: updateAnswerDto.id_question, 
    content: updateAnswerDto.content,
    iscorrect : updateAnswerDto.iscorrect,
   

  }]).eq('id',id)

  if (AnswerUpdateError){

    throw new Error(AnswerUpdateError.message);

  }
  
  return console.log("🚀 ~ AnswerService ~ updateAnswer ~ Answer Successfully Updated !"),Answer;
  
}


//---------------------------------------------------Service find All Question Answers with RPC method ---------------------------------------------------------------


async findAllQuestionAnswers(id_question: string) {

  const supabase = this.supabaseService.getClient();

   const {data: AllAnswers, error : findAllQuestionAnswersError}= await supabase
   .from('answer')
   .select()
   .eq('id_question',id_question)
   

   if (findAllQuestionAnswersError){

    throw new Error(findAllQuestionAnswersError.message)

   }
   
  return console.log("🚀 ~ AnswersService ~ findAllQuestionAnswers ~ Answers are found successfully !"),AllAnswers;

  }


//---------------------------------------------------Service find One Question with RPC method ---------------------------------------------------------------

async findOneAnswer(id: string) {

  const supabase = this.supabaseService.getClient();

  const{data : Answer, error: findOneAnswerError} = await supabase
  .from('answer')
  .select()
  .eq('id',id)

  if (findOneAnswerError){

    throw new Error(findOneAnswerError.message);
    
  }
  
  return console.log("🚀 ~ AnswerService ~ findOneAnswer ~ Answer found !"), Answer;

}

  //---------------------------------------------------Service delete Answer by id ---------------------------------------------------------------

async deleteAnswer(id: string) {

  const supabase = this.supabaseService.getClient();

  const{error: deleteAnswerError} = await supabase
  .from('answer')
  .delete()
  .eq('id',id)

  if (deleteAnswerError){

    throw new Error(deleteAnswerError.message)

  }

  return  console.log("🚀 ~ AnswerService ~ deleteAnswer ~ Answer deleted !");

}

}
