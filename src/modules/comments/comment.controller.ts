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
  UseGuards,
} from '@nestjs/common';
import { CreateCommentDto, UpdateCommentDto } from './comment.dto';
import { JWTGuard } from '../auth/jwt/jwt.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @UseGuards(JWTGuard)
  async getById(@Query() { postId }) {
    return await this.commentService.getByPostId(postId);
  }

  @Post()
  @UseGuards(JWTGuard)
  async create(@Body() body: CreateCommentDto) {
    return await this.commentService.create(body);
  }

  @Put(':id')
  @UseGuards(JWTGuard)
  async update(@Param('id') commentId: string, @Body() body: UpdateCommentDto) {
    return await this.commentService.update(commentId, body);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  async delete(@Param('id') commentId: string) {
    return await this.commentService.delete(commentId);
  }
}
