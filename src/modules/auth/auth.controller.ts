import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../users/user.service';
import { TokensService } from './token.service';
import { JWTGuard } from './jwt/jwt.guard';
import { RegisterRequest } from './dto/register-request.dto';
import { LoginRequest } from './dto/login-request.dto';
import { RefreshRequest } from './dto/refresh-request.dto';

@Controller('/api/auth')
export class AuthenticationController {
  public constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {}

  @Post('/register')
  public async register(@Body() body: RegisterRequest) {
    const user = await this.userService.createUserFromRequest(body);

    const token = await this.tokensService.generateAccessToken(user);

    const refresh = await this.tokensService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    return { user, token, refresh };
  }

  @Post('/login')
  public async login(@Body() body: LoginRequest) {
    const { username, password } = body;

    const user = await this.userService.findForUsername(username);
    const valid = user
      ? await this.userService.validateCredentials(user, password)
      : false;

    if (!valid) {
      throw new UnauthorizedException('The login is invalid');
    }

    const token = await this.tokensService.generateAccessToken(user);
    const refresh = await this.tokensService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    return { user, token, refresh };
  }

  @Post('/refresh')
  public async refresh(@Body() body: RefreshRequest) {
    const { user, token } =
      await this.tokensService.createAccessTokenFromRefreshToken(
        body.refresh_token,
      );

    return { user, token };
  }

  @Get('/me')
  @UseGuards(JWTGuard)
  public async getUser(@Req() request) {
    const userId = request.user.id;

    return await this.userService.findForId(userId);
  }
}
