import {Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Task} from './task.entity';

export class TaskRepository extends Repository<Task> {
    constructor (
        @InjectRepository(Task)
        private taskRepository: Repository<Task>
    ) {
        super(taskRepository.target, taskRepository.manager, taskRepository.queryRunner)
    }
}