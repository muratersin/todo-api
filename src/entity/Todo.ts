/* eslint-disable indent */
import { Column, Entity } from 'typeorm';
import AbstractEntity from './AbstractEntity';
import { TodoStatus } from '../constants/enums';

@Entity()
export default class Todo extends AbstractEntity {
  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'text', nullable: true })
  content: string;

  @Column({ type: 'numeric' })
  priority: number;

  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.Active })
  status: TodoStatus;
}
