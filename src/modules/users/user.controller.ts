import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put, Req,
  UseGuards
} from "@nestjs/common";
import { CreateChargeDto, CreateUserDto } from './user.dto';
import { JWTGuard } from '../auth/jwt/jwt.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JWTGuard)
  async getById(@Param('id') userId: string) {
    return await this.userService.getById(userId);
  }

  @Put(':id')
  @UseGuards(JWTGuard)
  async update(@Param('id') userId: string, @Body() body: CreateUserDto) {
    return await this.userService.update(userId, body);
  }

  @Delete(':id')
  @UseGuards(JWTGuard)
  async delete(@Param('id') userId: string) {
    return await this.userService.delete(userId);
  }

  @Post('charge')
  @UseGuards(JWTGuard)
  async createCharge(@Body() charge: CreateChargeDto, @Req() request) {
    return await this.userService.change(
      charge.amount,
      charge.paymentMethodId,
      request.user.stripe_id,
    );
  }
}
