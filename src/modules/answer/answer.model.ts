import {
  Model,
  Table,
  Column,
  DataType,
  PrimaryKey,
  ForeignKey,
  AutoIncrement,
  DefaultScope,
} from 'sequelize-typescript';

import { Users } from '../user/user.model';
import { Questions } from '../question/question.model';

@DefaultScope({
  attributes: {
    exclude: ['deletedAt'],
  },
})
@Table({
  tableName: 'Answers',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Answers extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Questions)
  @Column(DataType.INTEGER)
  questionId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.STRING)
  recommendations: string;

  @Column(DataType.BOOLEAN)
  isDraft: boolean;

  @Column(DataType.STRING)
  createdBy: number;

  @Column(DataType.STRING)
  updatedBy: number;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.STRING)
  deletedBy: string;
}
