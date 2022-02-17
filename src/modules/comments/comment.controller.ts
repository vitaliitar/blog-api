import { CommentService } from './comment.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getById(@Query() { postId }) {
    return await this.commentService.getByPostId(postId);
  }

  @Post()
  async create(@Body() body: CreateCommentDto) {
    return await this.commentService.create(body);
  }

  @Put(':id')
  async update(@Param('id') commentId: string, @Body() body: UpdateCommentDto) {
    return await this.commentService.update(commentId, body);
  }

  @Delete(':id')
  async delete(@Param('id') commentId: string) {
    return await this.commentService.delete(commentId);
  }
}
