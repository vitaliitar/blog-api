import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../users/user.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectModel(RefreshToken)
    private readonly refreshTokenRepository: typeof RefreshToken,
  ) {}

  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    const expiration = new Date();

    return this.refreshTokenRepository.create({
      userId: user.id,
      isRevoked: false,
      expires: expiration.setTime(expiration.getTime() + ttl),
    });
  }

  public async findTokenById(id: string): Promise<RefreshToken> {
    return this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    });
  }
}
