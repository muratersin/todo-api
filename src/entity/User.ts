/* eslint-disable indent */
import { ConflictError } from 'restify-errors';
import { Column, Entity, BaseEntity } from 'typeorm';
import { UserDTO } from '../types';
import AbstractEntity from './AbstractEntity';
import UserCredential from './UserCredential';

@Entity()
export default class User extends AbstractEntity implements BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  firstName: string;

  @Column({ type: 'varchar', length: 50 })
  lastName: string;

  @Column({ type: 'varchar', length: 200, unique: true })
  email: string;

  static async register(userDto: UserDTO) {
    const existsUser = await this.find({
      where: {
        email: userDto.email,
      },
    });

    if (existsUser) {
      throw new ConflictError('This user already exists!');
    }

    const user = new User();
    user.email = userDto.email;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    const r = await user.save();

    const userCredential = new UserCredential();
    userCredential.password = userDto.password;
  }
}
