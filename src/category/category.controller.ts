import { Controller, Get, Post, Body, Patch, Param, Delete,Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators';
import { UpdateAnswerDto } from 'src/answer/dto/update-answer.dto';


// @UseGuards(AuthGuard)
// @UseGuards(AuthGuard,RolesGuard)
// @Roles(1,2)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

//---------------------------------------------------Controller Create Category with RPC method ---------------------------------------------------------------


  @Post('createCategory')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }


//---------------------------------------------------Controller finAllCategories Category with RPC method ---------------------------------------------------------------


  @Get('findallCategories')
  findAllCategories() {
    return this.categoryService.findAllCategories();
  }


//---------------------------------------------------Controller findOneCategory Category with RPC method ---------------------------------------------------------------


  @Get('findOneCategory/:id')
  findOneCategory(@Param('id') id: string) {
    return this.categoryService.findOneCategory(id);
  }


//---------------------------------------------------Controller update Category with RPC method ---------------------------------------------------------------


  // @Put('updateCategory')
  // updateCategory(@Body('id') id: string,@Body()updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoryService.updateCategory(id, updateCategoryDto);
  // }

//---------------------------------------------------Controller update Category with RPC method ---------------------------------------------------------------

@Put('updateCategory/:idcategory')
  update(@Param('idcategory') idcategory:string,@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(idcategory,updateCategoryDto);
  }



//---------------------------------------------------Controller Delete Category with RPC method ---------------------------------------------------------------


  @Delete('deleteCategory/:idcategory')
  removeCategory(@Param('idcategory') idcategory: string) {
    return this.categoryService.deleteCategory(idcategory);
  }

  
}
