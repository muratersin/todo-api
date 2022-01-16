import {
  Between,
  Column,
  Entity,
  JoinColumn,
  LessThan,
  ManyToOne,
  MoreThan,
} from 'typeorm';
import { IsNotEmpty, Length, Max, Min } from 'class-validator';

import AbstractEntity from '../../entity/abstract-entity';
import { TodoStatus } from '../../constants/enums';
import { User } from '../user';
import { Group } from '../group';
import { TodoQuery } from '../../types';

@Entity()
export default class Todo extends AbstractEntity {
  @Length(2, 100)
  @Column({ type: 'varchar', length: 100 })
  content!: string;

  @Min(1)
  @Max(10)
  @Column({ type: 'numeric' })
  priority!: number;

  @IsNotEmpty()
  @Column({ type: 'enum', enum: TodoStatus, default: TodoStatus.Active })
  status!: TodoStatus;

  @IsNotEmpty()
  @Column({ type: 'date' })
  dueDate!: Date;

  @ManyToOne(() => User)
  @JoinColumn()
  user!: User;

  @ManyToOne(() => Group, { onDelete: 'CASCADE' })
  @JoinColumn()
  group!: Group;

  static async findByQuery(query: TodoQuery) {
    const where: any = {
      user: query.userId,
    };

    if (query.priority) {
      where.priority = query.priority;
    }

    if (query.status) {
      where.status = query.status;
    }

    if (query.groupId) {
      where.group = query.groupId;
    }

    if (query.minDueDate && query.maxDueDate) {
      where.dueDate = Between(query.minDueDate, query.maxDueDate);
    } else if (query.minDueDate) {
      where.dueDate = MoreThan(query.minDueDate);
    } else if (query.maxDueDate) {
      where.dueDate = LessThan(query.maxDueDate);
    }

    const todos = await Todo.find({
      select: ['id', 'content', 'priority', 'status', 'dueDate'],
      relations: ['group'],
      where,
    });

    return todos;
  }
}
