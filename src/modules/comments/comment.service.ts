import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './comment.entity';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private readonly commentRepository: typeof Comment,
  ) {}

  async getByPostId(postId: string): Promise<Comment[]> {
    return await this.commentRepository.findAll({
      where: { postId: postId },
    });
  }

  async create(data: CreateCommentDto): Promise<Comment> {
    return await this.commentRepository.create<Comment>(data);
  }

  async update(
    postId: string,
    data: UpdateCommentDto,
  ): Promise<[number, Comment[]]> {
    return await this.commentRepository.update<Comment>(data, {
      where: { id: postId },
      returning: true,
    });
  }

  async delete(commentId: string): Promise<void> {
    await this.commentRepository.destroy({
      where: { id: commentId },
    });
  }
}
