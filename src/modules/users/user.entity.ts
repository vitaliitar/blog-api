import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({ tableName: 'users', updatedAt: false })
export class User extends Model<User> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @AllowNull(false)
  @Column(DataType.UUID)
  id: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.DATE)
  createdAt: string;
}
