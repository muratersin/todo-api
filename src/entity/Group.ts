import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Length } from 'class-validator';

import AbstractEntity from './AbstractEntity';
import User from './User';

@Entity()
export default class Group extends AbstractEntity {
  @Length(2, 50)
  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;
}
