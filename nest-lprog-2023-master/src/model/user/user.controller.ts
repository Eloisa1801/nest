import { DeleteUserDto } from './dto/delete-user-dto';
import { Body, Controller, Get, Post, Param, Delete, Patch, UseInterceptors } from '@nestjs/common';
import { UserDTO } from './../user';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/common/interceptions/log.interceptor';
@Controller('user')
@UseInterceptors(LogInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }

  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Body() pwd: DeleteUserDto) {
    return this.userService.delete(id, pwd.currentPwd);
  }


  @Patch('/:id')
  update(@Param('id') id: string, @Body() user: UpdateUserDto & UserDTO) {
    return this.userService.update(id, user)
  }

}