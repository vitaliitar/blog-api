import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { Comment } from '../comments/comment.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async getById(userId: string): Promise<User> {
    return await this.userRepository.findByPk(userId, {
      include: [
        { model: Comment, attributes: { exclude: ['userId'] } },
        { model: Post, attributes: { exclude: ['userId'] } },
      ],
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.create<User>(user);
  }

  async update(userId: string, data: CreateUserDto): Promise<[number, User[]]> {
    return await this.userRepository.update<User>(data, {
      where: { id: userId },
      returning: true,
    });
  }

  async delete(userId: string): Promise<void> {
    await this.userRepository.destroy({
      where: { id: userId },
    });
  }
}
