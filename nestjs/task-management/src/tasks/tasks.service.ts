import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {TaskRepository} from './task.repository';
import { Task } from './task.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
      ) {}


    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto)
    }

    async getTaskById(id: string): Promise<Task> {
        
        const found = await this.taskRepository.findOneBy({id})
    
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    
        return found;
      }

    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskRepository.createTask(createTaskDto, user);
    }

    async deleteTask(id: string): Promise<void> {
       const result = await this.taskRepository.delete(id)
       if(result.affected === 0){
            throw new NotFoundException(`Task with ID "${id}" not found`);
       }
    }

    async updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const {status} = updateTaskStatusDto;
        const task = await this.getTaskById(id);
        task.status = status;
        await this.taskRepository.save(task)
        return task;
    }
}
