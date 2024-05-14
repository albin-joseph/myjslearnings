import { Test } from "@nestjs/testing";
import { TasksService } from "./tasks.service";
import { TaskRepository } from "./task.repository";

const mockTaskRepository = () => ({
    getTasks: jest.fn()
})

const mockUser = {
    username: 'albin',
    id: 'asasas',
    password: '434wdsd3',
    tasks: []
}

describe('TaskService', () => {
    let taskService: TasksService;
    let taskRespository: TaskRepository;

    beforeEach(async ()=>{
        //Initialize NestJs module with TaskService and TaskRespository
        const module = await Test.createTestingModule({
            providers: [TasksService, {
                provide: TaskRepository, useFactory: mockTaskRepository
            }],
        }).compile();

        taskService = module.get(TasksService);
        taskRespository = module.get(TaskRepository);
    })

    describe('getTasks', () => {
        it('calls TaskRespository.getTasks and returns the result', () => {
            expect(taskRespository.getTasks).not.toHaveBeenCalled();
            //taskRespository.getTasks.mockResolvedValue('someValue')
            const result = taskService.getTasks(null, mockUser)
            expect(taskRespository.getTasks).toHaveBeenCalled();
            //expect(result).toEqual('...something')
        })
    })
})