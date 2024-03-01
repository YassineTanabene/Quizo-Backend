import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post('createGroup')
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.createGroup(createGroupDto);
  }

  @Get('getAllGroup')
  findAll() {
    return this.groupService.getAllGroup();
  }

  @Get('getOneGroup/:id')
  findOne(@Param('id') id: string) {
    return this.groupService.getOneGroup(id);
  }

  @Put('updateGroup/:id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.updateGroup(id, updateGroupDto);
  }

  @Delete('deleteGroup/:id')
  remove(@Param('id') id: string) {
    return this.groupService.removeGroup(id);
  }
}
