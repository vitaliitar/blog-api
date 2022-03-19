import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './refresh-token.entity';
import { UserModule } from '../users/user.module';
import { AuthenticationController } from './auth.controller';
import { TokensService } from './token.service';
import { RefreshTokensRepository } from './refresh-token.repository';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([RefreshToken]),
    JwtModule.register({
      secret: '<SECRET KEY>',
      signOptions: {
        expiresIn: '5m',
      },
    }),
    UserModule,
  ],
  controllers: [AuthenticationController],
  providers: [TokensService, RefreshTokensRepository, JwtStrategy],
})
export class AuthenticationModule {}
