import {
  Model,
  Table,
  Column,
  Scopes,
  DataType,
  PrimaryKey,
  AutoIncrement,
  Unique,
  DefaultScope,
} from 'sequelize-typescript';
import { ROLES } from 'src/common/enums';

@DefaultScope({
  attributes: {
    exclude: ['deletedAt'],
  },
})
@Scopes({
  basic: {
    attributes: {
      exclude: ['deletedAt,password'],
    },
  },
})
@Table({
  tableName: 'Users',
  timestamps: true,
  underscored: true,
  paranoid: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Unique
  @Column(DataType.STRING)
  email: string;

  @Unique
  @Column(DataType.STRING)
  userName: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  middleName?: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.ENUM(ROLES.CONSULTANT, ROLES.PATIENT))
  role: ROLES;

  @Column(DataType.STRING)
  createdBy: string;

  @Column(DataType.STRING)
  updatedBy: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.DATE)
  deletedAt: Date;

  @Column(DataType.STRING)
  deletedBy: string;
}
