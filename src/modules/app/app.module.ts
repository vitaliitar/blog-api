import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from '../../config/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../users/user.module';
import { PostModule } from '../posts/post.module';
import { CommentModule } from '../comments/comment.module';
import { AuthenticationModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthenticationModule,
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return config.get('database');
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
