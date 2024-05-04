# TASK Managemnt Application
### This application includes following features
* Create Task
* Update Task
* Delete Task

### objectives: Back-end & Architecture
* Develop production-ready REST APIS
* CRUD operations (Create, Read, Update, Delete)
* Error handling
* Data Transfer Objects (DTO)
* System modularity
* Back-end development best practices
* Configuration Management
* Logging
* Security best practices

### objectives: Persistence
* Connecting the application to a database
* Working with relational databases
* Using TypeORM
* Writing simple and complex queries using QueryBuilder
* Performance when working with a database

### objectives: Authorization/Authentication
* Signing up, signing in
* Authentication and Authorization
* Protected resources
* Ownership of tasks by users
* Using JWT tokens (JSON Web Tokens).
*  Password hashing, salts and properly storing passwords

### objectives: Deployment
* Polishing the application for Production use
* Deploying NestJS apps to AWS (Amazon Web Services)
* Deploying front-end applications to Amazon S3
* Wiring up the front-end and back-end

### How to create a NestJS project & run the project
* Configure `NodeJS` in your system
* Install `NestJS CLI` globally in your machine. Please use the following command `npm install -g @nestjs/cli`
* To create NestJS project; please enter following command `nest new <project_name>`
* To run the project please enter followng commands `cd <project_name>` & `npm run start`

### NestJS Modules
* Each application has at least one module - the root module. That is the starting point of the application.
* Modules are an effective wav to organize components b a closely related set of capabilities (e.g. per feature).
* It is a good practice to have a folder per module, containing the module's components.
* Modules are singletons, therefore a module can be imported by multiple other modules.

### Defining a module
* A module is defined by annotating a class with the `@Module` decorator.
* The decorator provides metadata that Nest uses to organize the application structure.

### @Module Decorator Properties
* **providers**: Array of providers to be available within the module via dependency injection.
* **controllers**: Array of controllers to be instantiated within the module.
* **exports**: Array of providers to export to other modules.
* **imports**: List of modules required by this module.Any exported provider by these modules will now be available in our module via dependency injection.

### Example of a module
``` js
@Module({
    providers: [ForumService], 
    controllers: [ForumController], 
    imports: [ 
        PostModule, 
        CommentModule, 
        AuthModule
    ], 
    exports: [
        ForumService
    ]
})

export class ForumModule {} 

```

### Helper Commands in NestJS
- In NestJS, so many commands available to ease the development. To get the details please try the following command `nest g --help`

- To create a module please use the following command `nest g module <module_name>`

### NestS Controllers
* Responsible for handling incoming requests and returning responses to the client.
* Bound to a specific path (for example, "/tasks" for the task resource). 
* Contain handlers, which handle endpoints and request methods(GET, POST, DELETE etc).
* Can take advantage of dependency injection to consume providers within the same module.

    #### Defining a Controller
    * Controllers are defined by decorating a class with the `@Controller` decorator.
    * The decorator accepts a string, which is the path to be handled by the controller.

    ``` js
    @Controller('/tasks')
      export class TasksController {

      }

    ```
    #### Defining a Handler
    * Handlers are simply methods within the controller class, decorated with decorators such as @Get, @Post, @Delete etcetera.

    ``` js
    @Controller('/tasks')
     export class TasksController {
        @Get ( )
        getAllTasks() {
            // do stuff
            return
        }
    @Post ( )
    createTask() {
        // do stuff
        return
        }
     }

    ```
    #### How the controller is working
    ```mermaid
        flowchart TD;
            step1["`**HTTP request incoming**`"]
            step2["`**Request routed to controller,
            hadler called with arguments**
            _NestJS will parse the relevant request data and 
            it will be available in the handler_
            `"]
            step1 --> step2
            step3["`**Handler handles the request**
            _perform  operations such as communication with a service.
            For example, retrieving from an item from the database._
            `"]
            step2 --> step3
            step4(["`**Handler returns response value**
            _Response can be of any type and even an exception.
            Nest will wrap the returned value as an HTTP response and return it to the client._
            `"])
            step3 --> step4
    ```



