import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user-dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    try {
      const hashedPwd = await hash(createUserDto.password, 10);

      const lowerEmail = createUserDto.email.toLowerCase();
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
}
