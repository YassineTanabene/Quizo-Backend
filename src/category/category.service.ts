import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SupabaseService } from 'supabase/supabase.service';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(private readonly supabaseService: SupabaseService){}


  //---------------------------------------------------Service Create Category with RPC method ---------------------------------------------------------------

  async createCategory(createCategoryDto: CreateCategoryDto):Promise<any>{

    const supabase = this.supabaseService.getClient();

    const {data:Category, error: categoryError } = await supabase.rpc('createcategory', {id_user: createCategoryDto.id,categoryname: createCategoryDto.categoryname});

    if (categoryError){
      throw new Error(categoryError.message);

    }
    return  console.log("🚀 ~ CategoryService ~ createCategory ~ Category Created Successfully !"),Category;
  }

//---------------------------------------------------Service find All Categories with RPC method ---------------------------------------------------------------

  async findAllCategories() {
    const supabase = this.supabaseService.getClient();
    const {data, error} = await supabase.rpc('findallcategories')
    return data;
  }

//---------------------------------------------------Service find One Category with RPC method ---------------------------------------------------------------


  async findOneCategory(id:string) {

    const supabase = this.supabaseService.getClient();

    const {data, error: get_one_category} = await supabase.rpc('findonecategory', {id: id})

    if (get_one_category){

      throw new Error(get_one_category.message)
    }

    return data;

  }


  //---------------------------------------------------Service update Category with RPC method ---------------------------------------------------------------

  // async updateCategory(id: string,updateCategoryDto:UpdateCategoryDto):Promise<any>{
  
  //   const supabase = this.supabaseService.getClient();
  
  //   const {data : Category, error: update_category_error} = await supabase.rpc('updatecategory', {id_user: id,idcategory: updateCategoryDto.idcategory,new_categoryname:updateCategoryDto.new_categoryname})
    
  //   if (update_category_error){
    
  //     throw new Error(update_category_error.message);
    
  //   }
    
  //   return console.log("🚀 ~ CategoryService ~ update ~ Category updated successfully !"),Category;
  
  // }


  //---------------------------------------------------Service edit Category 2 with RPC method ---------------------------------------------------------------


  async updateCategory(idcategory:string,updateCategoryDto: UpdateCategoryDto):Promise<Category> {

    const supabase = this.supabaseService.getClient();
  
    const{ data : Category, error:  CategoryUpdateError} = await supabase
    .from('category')
    .update([{
      categoryname : updateCategoryDto.new_categoryname,
  
    }]).eq('idcategory',idcategory)
  
    if (CategoryUpdateError){
  
      throw new Error(CategoryUpdateError.message);
  
    }
    
    return console.log("🚀 ~ AnswerService ~ updateAnswer ~ Answer Successfully Updated !"),Category;
    
  }
  

  //---------------------------------------------------Service Delete Category with RPC method ---------------------------------------------------------------


  async deleteCategory(id: string) {

    const supabase = this.supabaseService.getClient();

    const { error : deleteCategoryError} = await supabase.rpc('deleteonecatgeory', {id: id})


    if (deleteCategoryError) {

      throw new Error(deleteCategoryError.message);

    }

    return console.log("🚀 ~ CategoryService ~ remove ~ Category deleted successfully !");
  }
}
