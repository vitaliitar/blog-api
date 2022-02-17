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
import { Post } from '../posts/post.entity';

@Table({ tableName: 'comments', updatedAt: false })
export class Comment extends Model<Comment> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  content: string;

  @Column(DataType.DATE)
  createdAt: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column(DataType.UUID)
  userId: string;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Post)
  @Column(DataType.UUID)
  postId: string;
}
