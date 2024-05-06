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

    return console.log("🚀 ~ QuestionService ~ createQuestion ~ Question Successfully created !",Question);
    
  }


  async createQuestions(createQuestionDto: CreateQuestionDto): Promise<any> {
    const supabase = this.supabaseService.getClient();
  
    const { data: questionData, error: questionError } = await supabase.rpc('createquestion', {
      id_quiz: createQuestionDto.id_quiz,
      question_content: createQuestionDto.question_content,
      explantation: createQuestionDto.explantation,
      questiontype: createQuestionDto.questiontype,
      answers: createQuestionDto.answers // Pass answers array to the stored procedure
    });
  
    if (questionError) {
      throw new Error(questionError.message);
    }
  
    console.log("Question and Answers created successfully!", questionData);
    return questionData;
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

  async findQuestionById(idquestion: string) {
    const supabase = this.supabaseService.getClient();
  
    try {
      const { data: questions, error } = await supabase
        .from('question')
        .select('*') 
        .eq('id', idquestion);
  
      if (error) {
        throw new Error(error.message);
      }
  
      if (!questions.length) {
        return null; 
      }
   
      const answersPromises = questions.map(async (question) => {
        const { data: answers, error: answerError } = await supabase
          .from('answer')
          .select('*') 
          .eq('id_question', question.id); 
        if (answerError) {
          throw new Error(answerError.message);
        }
        return { ...question, answers };
      });
      const questionsWithAnswers = await Promise.all(answersPromises);
      return questionsWithAnswers;
    } catch (error) {
      console.error('Error fetching question and answers:', error);
  
      return null; 
    }
  }

  
async findQuestionsByQuizId(quizId: string) {
  const supabase = this.supabaseService.getClient();

  try {
    const { data: questions, error } = await supabase
      .from('question')
      .select('*') 
      .eq('id_quiz', quizId); // Utilisez l'ID du quiz pour récupérer les questions associées

    if (error) {
      throw new Error(error.message);
    }

    if (!questions.length) {
      return null; 
    }
 
    const answersPromises = questions.map(async (question) => {
      const { data: answers, error: answerError } = await supabase
        .from('answer')
        .select('*') 
        .eq('id_question', question.id); 
      if (answerError) {
        throw new Error(answerError.message);
      }
      return { ...question, answers };
    });
    const questionsWithAnswers = await Promise.all(answersPromises);
    return questionsWithAnswers;
  } catch (error) {
    console.error('Error fetching questions and answers by quiz ID:', error);

    return null; 
  }
}

  
}
