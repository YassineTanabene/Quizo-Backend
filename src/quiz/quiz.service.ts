import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SupabaseService } from 'supabase/supabase.service';

@Injectable()
export class QuizService {
  
  constructor(private readonly supabaseService: SupabaseService){}


//---------------------------------------------------Service Create quiz with RPC method ---------------------------------------------------------------

  async createCategory(createQuizDto: CreateQuizDto): Promise<any> {

    const supabase = this.supabaseService.getClient();

    const {data: Quiz, error: QuizCreationError} = await supabase.rpc('createquiz', {

      id:createQuizDto.id_category,
      quiztitle: createQuizDto.quiztitle,
      material: createQuizDto.material,
      duration: createQuizDto.duration,
      deadline: createQuizDto.deadline,
      noofinvitations: createQuizDto.noofinvitations,
      difficultylevel: createQuizDto.difficultylevel,
      noofquestions: createQuizDto.noofquestions,
      creator: createQuizDto.creator

    })

    if (QuizCreationError){

      throw new Error(QuizCreationError.message);

    }


    return console.log("🚀 ~ QuizService ~ createQuiz ~ The Quiz was Successfully Created  !" ) , Quiz;

  }

//---------------------------------------------------Service update quiz with RPC method ---------------------------------------------------------------
  
  async updateQuiz(idquiz: string, updateQuizDto: UpdateQuizDto):Promise<any> {

    const supabase = this.supabaseService.getClient();

    const {data: UpdatedQuiz, error: QuizUpdateError} = await supabase.rpc('update_quiz',

     { 

      idquiz: idquiz,
      new_id_category:updateQuizDto.id_category,
      new_quiztitle: updateQuizDto.quiztitle,
      new_material: updateQuizDto.material,
      new_duration: updateQuizDto.duration,
      new_deadline: updateQuizDto.deadline,
      new_noofinvitations: updateQuizDto.noofinvitations,
      new_difficultylevel: updateQuizDto.difficultylevel,
      new_noofquestions: updateQuizDto.noofquestions,
      new_creator: updateQuizDto.creator 

    })
    if (QuizUpdateError) {

      throw new Error(QuizUpdateError.message);

    }

    return console.log("🚀 ~ QuizService ~ updateQuiz ~ success: The Quiz was successfully updated"), UpdatedQuiz;

  }



//---------------------------------------------------Service delete quiz with RPC method ---------------------------------------------------------------

  async deleteQuiz(idquiz: string) {

    const supabase = this.supabaseService.getClient();

    const { error : QuizDeleteError} = await supabase.rpc('deletequiz', {idquiz: idquiz})


    if (QuizDeleteError) {

      throw new Error(QuizDeleteError.message);

    }

    return console.log("🚀 ~ QuizService ~ deleteQuiz ~ The Quiz was successfully Deleted !");

  }




//---------------------------------------------------Service find All Categories with RPC method ---------------------------------------------------------------

async findAllQuizes() {

  const supabase = this.supabaseService.getClient();

  const {data, error} = await supabase.rpc('findallquizes');

  return console.log("🚀 ~ QuizService ~ finAllQuizes ~ Quizes list is ready !") , data;

}


//---------------------------------------------------Service find One Category with RPC method ---------------------------------------------------------------


 async findOneQuiz(idquiz: string) {

  const supabase = this.supabaseService.getClient();

  const {data, error: findOneQuizError} = await supabase.rpc('findonequiz', {idquiz:idquiz})

  if (findOneQuizError){

    throw new Error(findOneQuizError.message)
  }

  return console.log("🚀 ~ QuizService ~ findOneQuiz ~ Quiz found successfully !"),data;

}



}
