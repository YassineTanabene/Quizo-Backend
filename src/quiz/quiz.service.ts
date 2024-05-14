import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { QuestionService } from 'src/question/question.service';
@Injectable()
export class QuizService {
  
  constructor(private readonly supabaseService: SupabaseService ,private readonly QuestionService:QuestionService){}


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

// async findAllQuizes() {

//   const supabase = this.supabaseService.getClient();

//   const {data, error} = await supabase.rpc('findallquizes');

//   return console.log("🚀 ~ QuizService ~ finAllQuizes ~ Quizes list is ready !") , data;


// }


async findAllQuizes(): Promise<any> {
  const supabase = this.supabaseService.getClient();
  console.log(supabase);

  try {
   
      const { data, error } = await supabase
      .from('quiz')
      .select('*');
  
        console.log(data);

    return data; 
  } catch (error) {
    console.error('Error fetching quiz:', error.message);
    console.error('Error fetching quiz:', error.message),null;
  }
}  
                
//---------------------------------------------------Service find One Category with RPC method ---------------------------------------------------------------

async findOneQuiz(idquiz: string) {
  const supabase = this.supabaseService.getClient();

  try {
    const { data: quizData, error: findOneQuizError } = await supabase.rpc('findonequiz', { idquiz: idquiz });
    if (findOneQuizError) {
      throw new Error(findOneQuizError.message); 
    }

    if (!quizData) {
      throw new Error('Quiz not found');
    }

    const questionData = await this.QuestionService.findQuestionsByQuizId(idquiz);

    console.log("🚀 ~Quiz avec ses questions, et chaque question avec ses answers", {
      quiz: quizData,
      questions: questionData
    });

    return {
      quiz: quizData,
      questions: questionData
    };
  } catch (error) {
    throw new Error(error.message);
  }
}


}
