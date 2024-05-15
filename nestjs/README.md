# About NestJS

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

    #### Defining a module
    * A module is defined by annotating a class with the `@Module` decorator.
    * The decorator provides metadata that Nest uses to organize the application structure.

    #### @Module Decorator Properties
    * **providers**: Array of providers to be available within the module via dependency injection.
    * **controllers**: Array of controllers to be instantiated within the module.
    * **exports**: Array of providers to export to other modules.
    * **imports**: List of modules required by this module.Any exported provider by these modules will now be available in our module via dependency injection.

    ``` mermaid
        flowchart TD;
            subgraph Structure of a Module
            step1["Module"]
            step2["Providers"]
            step1 --> step2
            step3["Controllers"]
             step1 --> step3
            step4["Exports"]
             step1 --> step4
            step5["Imports"]
             step1 --> step5
            end
        

    ```

    #### Example of a module
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
   
   ```mermaid
        flowchart LR;
            subgraph Module
            step1["Controller"]
            step2["Service x"]
            step1 --> step2
            step3["Service y"]
            step1 --> step3
            step4["Service z"]
            step1 --> step4
            end
    ```

### Helper Commands in NestJS
- In NestJS, so many commands available to ease the development. To get the details please try the following command `nest g --help`

- To create a module please use the following command `nest g module <module_name>`
- To create a controller please use the following command `nest g controller <controller_name>` or `nest g controller <controller_name> --no-spec`
- To create a service please use the following command `nest g service <service_name>` or `nest g service <service_name> --no-spec`

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
            step4["`**Handler returns response value**
            _Response can be of any type and even an exception.
            Nest will wrap the returned value as an HTTP response and return it to the client._
            `"]
            step3 --> step4
    ```
### NestJS Providers
* Can be injected into constructors if decorated as an ```@Injectable```, via **dependency injection**.
* Can be a plain value, a class, sync/async factory etc.
* Providers must be provided to a module for them to be usable.
*  Can be exported from a module - and then be available to other modules that import it.

### What is a Service?
* Defined as providers. **Not all providers are services.**
* Common concept within software development and are not exclusive NestJS, JavaScript or back-end development.
* Singleton when wrapped with ```@Injectable ()``` and provided to a module. That means, the same instance will be shared across the application - acting as a single source of truth.
* The main source of business logic. For example, a service will be called from a controller to validate data, create an item in the database and return a response.

### Dependency Injection in NestJS
* Any component within the NestS ecosystem can inject a provider that is decorated with the @Injectable.
* We define the dependencies in the constructor of the class. NestS will take care of the injection for us, and it will then be available as a class property.

### About DTOs
* Common concept in software development that is not specific to NestJS.
* Result in more bulletproof code, as it can be used as a TypeScript type
* Do not have any behavior except for storage, retrieval, serialization and deserialization of its own data.
* Result in increased performance (although negligible in small applications).
*  Can be useful for data validation.
* A DTO is NOT a model definition. It defines the shape of data for a specific case, for example - creating a task.
* Can be defined using an ```interface``` or a ```class```.
* Data Transfer Objects are NOT mandatory. You can still develop applications without using DOs. However, the value they add makes it worthwhile to use them when applicable.
* Applying the DTO pattern as soon as possible will make it easy for you to maintain and refactor your code.

    #### Classes VS Interfaces for DTOS
    * Data Transfer Objects (DOs) can be defined as classes or interfaces.
    * The recommended approach is to use classes, also clearly documented in the NestJS documentation.
    * The reason is that interfaces are a part of TypeScript and therefore are not preserved post-compilation.
    * classes allow us to do more, and since they are a part of JavaScript, they will be preserved post-compilation.
    * NestJS cannot refer to interfaces in run-time, but can refer to classes.

### NestJs Pipes
* Pipes operate on the arguments to be processed by the route handler, just before the handler is called.
* Pipes can perform data transformation or data validation.
* Pipes can return data - either original or modified - which will be passed on to the route handler.
* Pipes can throw exceptions. Exceptions thrown will be handled by NestS and parsed into an error response.
* Pipes can be asynchronous.

    #### Default Pipes in NestJS
    * NestS ships with useful pipes within the @nestjs/common module.
    
        **ValidationPipe**

        _Validates the compatibility of an entire object against a class (goes well with DOS, Data Transfer Objects). If any property cannot be mapped properly (for example, mismatching type) validation will fail._

        _A very common use case, therefore having a built-in validation pipe is extremely useful._

        **ParseIntPipe**

        _By default, arguments are of type String. This pipe validates that an argument is a number. If successful, the argument is transformed into a Number and passed on to the_
    
    #### Custom Pipe Implementation
    * Pipes are ```classes``` annotated with the ```@Injectable()``` decorator.
    * Pipes must implement the PipeTransform generic interface. Therefore, every pipe must have a transform) method. This method will be called by NestJs to process the arguments.
    * The ```transform()``` method accepts two parameters:

        **value**: the value of the processed argument. 

        **metadata** (optional): an object containing metadata about the argument.
        
    * Whatever is returned from the transform) method will be passed on to the route handler. Exceptions will be sent back to the client.
    * Pipes can be consumed in different ways.

    * **Handler-level pipes** are defined at the handler level, via the @UsePipes () decorator. Such pipe will process all parameters for the incoming requests.

    ``` js    
        @Post ( )
        @UsePipes (SomePipe)
        createTask(
        @Body( 'description') description
        ) {
            //...
        }
    
    ```
    * **Parameter-level pipes** are defined at the parameter level. Only the specific parameter for which the pipe has been specified will be processed.

    ``` js
        @Post ( )
        createTask(
        @Body( 'description', SomePipe) description
        ) {
            //...
        }
    ```
    * **Global pipes** are defined at the application level and will be applied to any incoming request.
    ``` js
        async function bootstrap() {
        const app = await NestFactory .create(ApplicationModule);
        app. useGlobalPipes (SomePipe);
        await app. listen(3000);
    ```

    #### Parameter-level VS Handler-level pipes. Which one?

    **It depends.**

    **Parameter-level pipes** tend to be slimmer and cleaner. However, they often result in extra code added to handlers - this can get messy and hard to maintain.

    **Handler-level pipes** require some more code, but provide some great benefits:
    * Such pipes do not require extra code at the parameter level.
    * Easier to maintain and expand. If the shape of the data changes, it is easy to make the necessary changes within the pipe only.
    * Responsibility of identifying the arguments to process is shifted to one central file - the pipe file.
    * Promote usage of DTOs (Data Transfer Objects) which is a very good practice.

### object Relational Mapping (ORM)
* Object-Relational Mapping (ORM) is a technique that lets you query and manipulate data from a database, using an object-oriented paradigm.
* There are many ORM libraries that allow developers to communicate to the database using their preferred programming language rather than sending plain queries directly.

    #### Pros and Cons of using an ORM library
    **Pros**
    - Writing the data model in one place - easier to maintain
    Less repetition.
    - Lots of things done automatically - database handling, data types, relations etcetera.
    No need to write SQL syntax (easy to learn, hard to master). Using your natural way of coding.
    - Database abstraction - you can change the database type whenever you wish.
    - Leverages 00P, therefore things like inheritance are easy to achieve.

    **Cons**
    - You have to learn it, and ORM libraries are not always simple.
    - Performance is alright, but it's easy to neglect.
    - Makes it easy to forget (or never learn) what's happening behind the scenes, which can lead to a variety of maintainability issues.

    #### TypeORM
    * TypeORM is an ORM library that can run in Node.is and be used with TypeScript (or JavaScript).
    * Helps us define and manage entities, repositories, columns, relations, replication, indices, queries, logging and so much more.
    nest

    **Example**

    Retrieving all tasks owned by "Ashley" and are of status "Done"

    *TypeORM:*

    ``` js
        const tasks = await Task. find({ status: 'DONE', user: 'Ashley' });
        
    ```

    *Pure JavaScript:*
    ``` js
        let tasks;
        db. query SELECT * FROM tasks WHERE status = "DONE" AND user = "Ashley", (err, result) => {
        if (err) {
            throw new Error 'Could not retrieve tasks!');
            tasks = result.rows;
        });

    ```

### What are JSON Web Tokens?
* Open-source industry standard (RFC-7519).
* Usable for Authorization or secure exchange of information between parties.
* Verify that the sender is who it/he/she claims to be.
* Signed by the issuer, using a secret or keypair (HMAC algorithm, RSA or ECDSA).
* JSON Web Tokens can be decoded by anyone. They should not contain sensitive information such as passwords.
* It is useful for front-end applications to use these tokens to toggle features conditionally. For example, if a user is an administrator, we could show or hide a certain button based on the claims in the token.
* Finally - JWTs should ideally be short-lived.

    #### JWT Structure
    ``` js
    eyJhbGci0ijIUZI1NiIsIn5cCI6IkpxVCJ9.eyJzdWIiOiIxMjMONTY30DK wIiwibmFtZSI6IkpvaG4gRG91IiwiaWFOIjoxNTE2MjM5MDIyfQ.sf1KxwRJ
    SMeKKF2QT4fwpMeJf36P0k6yJV_adQssw5c

    ```
    * **Header** contains metadata about the token (type, hashing algorithm etc).
    * **Payload** contains claims (statements about an entity - for example, a user) and additional data.
    * **Signature** is the result of the encoded header, the encoded payload, signed against a secret.

### Logging

#### Types of Logs

* **Log** - General purpose logging of important information.
* **Warning** - Unhandled issue that is NOT fatal or destructive.
* **Error** - Unhandled issue that is fatal or destructive.
* **Debug** - Useful information that can help us debug the logic in case of an error/warning. Intended for developers.
* **Verbose** - Information providing insights about the behavior of the application. Intended for operators (for example, support). Usually "too much information'

### Configuration
* Central way of defining values that are loaded upon starting the application (should not be changed during runtime).
* Configuration per environment - development, staging, production, etc.
* Configuration can be defined in the code base. Useful if you work with multiple developers via version control.
* Can be defined in many ways (JSON, YAML, XML, Environment Variables etc), using custom solutions or open-source libraries.

### Codebase VS Environment Variables
* You could define configuration in your codebase. For example, in a config folder.
* You could also support configuring values via environment variables (which are provided when running the application).

    *Example:*
    *Non-sensitive information such as the port to run the application on, will be defined in the code base.*

* Sensitive information such as database username and password for production mode, will be provided via environment variables upon running the application.

