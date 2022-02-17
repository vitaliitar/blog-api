import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './post.entity';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { Comment } from '../comments/comment.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private readonly postRepository: typeof Post,
  ) {}

  async getAll(): Promise<Post[]> {
    return await this.postRepository.findAll({
      include: [Comment],
    });
  }

  async getById(postId: string): Promise<Post> {
    return await this.postRepository.findByPk(postId, {
      include: [Comment],
    });
  }

  async create(post: CreatePostDto): Promise<Post> {
    return await this.postRepository.create<Post>(post);
  }

  async update(postId: string, data: UpdatePostDto): Promise<[number, Post[]]> {
    return await this.postRepository.update<Post>(data, {
      where: { id: postId },
      returning: true,
    });
  }

  async delete(postId: string): Promise<void> {
    await this.postRepository.destroy({
      where: { id: postId },
    });
  }
}
