// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user.entity';
// import { Task } from './task.entity';
// import { AuthModule } from '../auth/auth.module';
// import { UserController } from './user.controller';
// import { UserService } from './user.service';
// import { TaskController } from './task.controller'; // Add this
// import { TaskService } from './task.service';       // Add this

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: 'task_system.db',
//       entities: [User, Task],
//       synchronize: true,
//     }),
//     TypeOrmModule.forFeature([User, Task]),
//     AuthModule,
//   ],
//   controllers: [UserController, TaskController], // Register TaskController
//   providers: [UserService, TaskService],         // Register TaskService
// })
// export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task_system.db',
      entities: [User, Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Task]),
    AuthModule,
  ],
  controllers: [UserController, TaskController],
  providers: [UserService, TaskService],
})
export class AppModule {}
