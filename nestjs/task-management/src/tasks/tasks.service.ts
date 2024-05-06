import { Injectable, NotFoundException } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import { TaskStatus} from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import {TaskRepository} from './task.repository';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        private readonly taskRepository: TaskRepository,
      ) {}

    // private tasks: Task[] = [];

    // public getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status){
    //         tasks = tasks.filter((task) => task.status === status)
    //     }

    //     if(search){
    //         tasks = tasks.filter((task) => {
    //             if(task.title.includes(search) || task.description.includes(search)) {
    //                 return true;
    //             }
    //             return false;
    //         });
    //     }

    //     return tasks
    // }

    async getTaskById(id: string): Promise<Task> {
        
        const found = await this.taskRepository.findOneBy({id})
    
        if (!found) {
          throw new NotFoundException(`Task with ID "${id}" not found`);
        }
    
        return found;
      }

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find((task) => task.id === id);
    //     if(!found) {
    //         throw new NotFoundException(`Task with ID '${id}' not found`)
    //     }
    //     return found
    // }

    // createTask(createTaskDto: CreateTaskDto): Task {
    //     const {title, description} = createTaskDto;
    //     const task: Task = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN
    //     };
    //     this.tasks.push(task);
    //     return task;
    // }

    // deleteTask(id: string): void {
    //    const found = this.getTaskById(id);
    //    this.tasks = this.tasks.filter((task) => task.id !== id);
    // }

    // updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto): Task {
    //     const {status} = updateTaskStatusDto;
    //     console.log(status)
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // }
}
