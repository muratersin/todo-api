/* eslint-disable indent */
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import AbstractEntity from './AbstractEntity';
import User from './User';

@Entity()
export default class Group extends AbstractEntity {
  @Column({ type: 'varchar', length: 50 })
  name: string;

  @OneToOne(() => User)
  @JoinColumn()
  profile: User;
}
