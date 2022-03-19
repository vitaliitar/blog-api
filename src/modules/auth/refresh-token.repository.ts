import { Injectable } from '@nestjs/common';
import { RefreshToken } from './refresh-token.entity';
import { User } from '../users/user.entity';

@Injectable()
export class RefreshTokensRepository {
  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    const token = new RefreshToken();

    token.userId = user.id;
    token.isRevoked = false;

    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.expires = expiration;

    return token.save();
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        id,
      },
    });
  }
}
