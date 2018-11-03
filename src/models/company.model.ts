import { Table, Column, Model, HasMany,  PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { User } from './user.model'
@Table({timestamps: true})
export class Company extends Model<Company> {

  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @HasMany(() => User)
  users: User[];
}