import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';

@Table({ tableName: 'refresh_tokens', timestamps: false })
export class RefreshToken extends Model<RefreshToken> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @Column(DataType.BOOLEAN)
  isRevoked: boolean;

  @Column(DataType.DATE)
  expires: number;
}
