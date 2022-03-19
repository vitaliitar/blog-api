import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({ tableName: 'refresh_tokens', timestamps: false })
export class RefreshToken extends Model<RefreshToken> {
  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @Column(DataType.BOOLEAN)
  isRevoked: boolean;

  @Column(DataType.DATE)
  expires: Date;
}
