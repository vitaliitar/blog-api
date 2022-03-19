import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { CreateUserDto } from './user.dto';
import { Comment } from '../comments/comment.entity';
import { Post } from '../posts/post.entity';
import { compare, hash } from 'bcrypt';
import { RegisterRequest } from '../auth/auth.dto';
import { col, fn, where } from 'sequelize';

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

  public async validateCredentials(
    user: User,
    password: string,
  ): Promise<boolean> {
    return compare(password, user.password);
  }

  public async createUserFromRequest(request: RegisterRequest): Promise<User> {
    const { username, password } = request;

    const existingFromUsername = await this.findForUsername(request.username);

    if (existingFromUsername) {
      throw new UnprocessableEntityException('Username already in use');
    }

    const user = new User();

    user.username = username;
    user.password = await hash(password, 10);

    return user.save();
  }

  public async findForId(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  public async findForUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        username: where(fn('lower', col('username')), username),
      },
    });
  }
}
