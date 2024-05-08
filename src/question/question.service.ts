import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { Question } from './entities/question.entity';
import { AnswerService } from 'src/answer/answer.service';
import { CreateAnswerDto } from 'src/answer/dto/create-answer.dto';

@Injectable()
export class QuestionService {

  constructor(private readonly supabaseService: SupabaseService,
    private readonly AnswerService:AnswerService
  ){}

//---------------------------------------------------Service Create Question with RPC method ---------------------------------------------------------------

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
  




  // async createQuestion(
  //   createQuestionDto: CreateQuestionDto,
  //   createOptionDtos: CreateAnswerDto[]
  // ): Promise<any> {
  //   const supabase = this.supabaseService.getClient();
  
  //   try {
  //     // Créer la question
  //     const questionData = await supabase
  //       .from('question')
  //       .insert([
  //         {
  //           id_quiz: createQuestionDto.id_quiz,
  //           question_content: createQuestionDto.question_content,
  //           explanation: createQuestionDto.explantation, 
  //           question_type: createQuestionDto.questiontype,
  //         }
  //       ]);
  
  //     if (!questionData || !questionData[0] || !questionData[0].id) {
  //       throw new Error('Failed to create question or question ID is missing');
  //     }
  //     const questionId = questionData[0].id;
    
  //     // Créer les options pour la question
  //     for (const createOptionDto of createOptionDtos) {
  //       const createAnswerDto: CreateAnswerDto = {
  //         id_question: questionId,
  //         content: createOptionDto.content,
  //         iscorrect: createOptionDto.iscorrect,
  //       };

  //       await this.AnswerService.createAnswer(createAnswerDto); 
  

  //     }
  
  //     console.log("Question and options successfully created!");
  
  //     return questionId;
  //   } catch (error) {

  //     throw new Error('Failed to create question with options');
  //   }
  // }
  



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



//---------------------------------------------------Service find One Question with RPC method ---------------------------------------------------------------

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


  //---------------------------------------------------Service delete Question by id with RPC method ---------------------------------------------------------------


  async deleteQuestion(idquestion: string) {
    const supabase = this.supabaseService.getClient();
    const{data , error} = await supabase.from('question').delete().eq('id',idquestion)
    return  console.log("🚀 ~ QuestionService ~ deleteQuestion ~ Question deleted !"), data;
  }
}