import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './post.dto';
import { JWTGuard } from '../auth/jwt.guard';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @UseGuards(JWTGuard)
  async getAll() {
    return await this.postService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') postId: string) {
    return await this.postService.getById(postId);
  }

  @Post()
  async create(@Body() body: CreatePostDto) {
    return await this.postService.create(body);
  }

  @Put(':id')
  async update(@Param('id') postId: string, @Body() body: UpdatePostDto) {
    return await this.postService.update(postId, body);
  }

  @Delete(':id')
  async delete(@Param('id') postId: string) {
    return await this.postService.delete(postId);
  }
}
