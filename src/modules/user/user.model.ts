import bcrypt from 'bcrypt';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from 'restify-errors';
import { Length, IsEmail, IsNotEmpty, validate } from 'class-validator';
import { Column, Entity, BaseEntity, BeforeInsert } from 'typeorm';
import jwt from 'jsonwebtoken';

import { LoginDTO, UserDTO } from '../../types';
import AbstractEntity from '../../entity/abstract-entity';
import { extractErrorMessages } from '../../helpers/validation';
import jwtConfig from '../../config/jwt.config';

@Entity()
export default class User extends AbstractEntity implements BaseEntity {
  @Length(2, 50)
  @Column({ type: 'varchar', length: 50 })
  firstName!: string;

  @Length(2, 50)
  @Column({ type: 'varchar', length: 50 })
  lastName!: string;

  @IsEmail()
  @Column({ type: 'varchar', length: 200, unique: true })
  email!: string;

  @Length(6)
  @IsNotEmpty()
  @Column({ type: 'text' })
  password!: string;

  static findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({
      where: {
        email,
      },
    });
  }

  static async register(userDto: UserDTO): Promise<void> {
    const existsUser = await User.findByEmail(userDto.email);

    if (existsUser) {
      throw new ConflictError('This user already exists!');
    }

    const user = new User();
    user.email = userDto.email;
    user.firstName = userDto.firstName;
    user.lastName = userDto.lastName;
    user.password = userDto.password;

    const [errorMessage] = extractErrorMessages(await validate(user));

    if (errorMessage) {
      throw new BadRequestError(errorMessage);
    }

    await user.save();
  }

  static async login(loginDto: LoginDTO): Promise<string> {
    const user = await User.findByEmail(loginDto.email);
    const isSuccess = user && (await user.comparePassword(loginDto.password));

    if (!isSuccess) {
      throw new UnauthorizedError('Wrong credentials!');
    }

    return jwt.sign(User.convertToSecureObject(user), jwtConfig.secret);
  }

  @BeforeInsert()
  private async encryptPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  comparePassword(password: string) {
    return bcrypt.compare(password, this.password);
  }

  static convertToSecureObject(user: User) {
    return {
      id: user.id,
      email: user.email,
      fullName: `${user.firstName} ${user.lastName}`,
    };
  }
}
