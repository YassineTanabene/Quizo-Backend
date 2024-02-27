import { Controller, Get, Post, Body, Patch, Param, Delete,Put } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

//---------------------------------------------------Controller Create Category with RPC method ---------------------------------------------------------------


  @Post('createcategory')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }


//---------------------------------------------------Controller finAllCategories Category with RPC method ---------------------------------------------------------------


  @Get('findallcategories')
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }


//---------------------------------------------------Controller findOneCategory Category with RPC method ---------------------------------------------------------------


  @Get('getonecategory')
  findOneCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.findOneCategory(createCategoryDto);
  }


//---------------------------------------------------Controller update Category with RPC method ---------------------------------------------------------------


  @Put('updatecategory')
  updateCategory(@Body('id') id: string,@Body()updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }



//---------------------------------------------------Controller Delete Category with RPC method ---------------------------------------------------------------


  @Delete('deletecategory/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(id);
  }

  
}
