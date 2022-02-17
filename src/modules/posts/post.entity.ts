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

@Table({ tableName: 'posts', updatedAt: false })
export class Post extends Model<Post> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  content: string;

  @Column(DataType.DATE)
  createdAt: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;
}
