import {
  Model,
  Table,
  Column,
  Scopes,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
} from 'sequelize-typescript';

import { Users } from '../user/user.model';

@Scopes({
  default: {
    attributes: {
      exclude: ['deletedAt'],
    },
  },
})
@Table({
  tableName: 'Questions',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Questions extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @Column(DataType.STRING)
  title: string;

  @Column(DataType.STRING)
  description: string;

  @Column(DataType.BOOLEAN)
  isAnswered: boolean;

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
}
