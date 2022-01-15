/* eslint-disable indent */
import { Column, Entity } from 'typeorm';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

import AbstractEntity from './AbstractEntity';
import { TodoStatus } from '../constants/enums';

@Entity()
export default class Todo extends AbstractEntity {
  @Length(2, 100)
  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Length(2, 300)
  @Column({ type: 'text', nullable: true })
  content!: string;

  @Min(1)
  @Max(10)
  @Column({ type: 'numeric' })
  priority!: number;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.Active })
  status!: TodoStatus;
}
