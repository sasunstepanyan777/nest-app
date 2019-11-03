// Packages
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// Models
import { IUser } from '../models/user.model';

@Entity('users')
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public username: string;

  constructor(data: IUser) {
    if (data) {
      this.id = data.id;
      this.email = data.email;
      this.password = data.password;
      this.username = data.username;
    }
  }
}
