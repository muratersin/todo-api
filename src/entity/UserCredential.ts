/* eslint-disable indent */
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import User from './User';
import AbstractEntity from './AbstractEntity';

@Entity()
export default class UserCredential extends AbstractEntity {
  @Column({ type: 'text' })
  password: string;

  @OneToOne(() => User)
  @JoinColumn()
  profile: User;
}
