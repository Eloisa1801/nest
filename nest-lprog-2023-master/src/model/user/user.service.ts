import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { compare, hash } from 'bcrypt';
import { UserDTO } from '../user';
import { UserNotFoundException } from './../../common/exepetions/user-not-found.exception';
import { UserExistExeception } from 'src/common/exepetions/user/email-in-use.exception';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const hashedPwd = await hash(createUserDto.password, 10);

      const lowerEmail = createUserDto.email.toLowerCase();
      this.exists(lowerEmail);
      await this.prisma.user.create({
        data: {
          ...createUserDto,
          role: 'USER',
          email: lowerEmail,
          password: hashedPwd,
        },
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.prisma.user.findMany();
    users.forEach((user) => delete user.password);
    return users;
  }

  async findByEmail(email: string): Promise<UserDTO> {
    const lowerEmail = email.toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: lowerEmail },
    });
    if (!user) {
      throw new UserNotFoundException();
    }
    delete user.password;
    return user;
  }

  async update(id: string, userDTO: UserDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data: { ...userDTO, updatedAt: new Date() },
    });
    delete user.password;
    return user;
  }

  async delete(id: string, pwd: string) {
    await this.validatePwd(id, pwd);
    return this.prisma.user.delete({ where: { id } });
  }
  private async validatePwd(id: string, currentPwd: string): Promise<void> {
    const user = this.prisma.user.findUnique({ where: { id } });
    const isCorrectPwd = await compare(currentPwd, (await user).password);
    if (!isCorrectPwd) {
      //exceptoin
      console.log('pwd is incorrect!');
    }
  }

  async exists(email: string) {
    if (await this.prisma.user.findUnique({
      where: { email },
    })
    ) {
      throw new UserExistExeception();
    }
  }

}

