// import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
// import { TaskService } from './task.service';
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// @Controller('tasks')
// export class TaskController {
//   constructor(private readonly taskService: TaskService) {}

//   @UseGuards(JwtAuthGuard)
//   @Post()
//   createTask(@Body('title') title: string, @Request() req: any) {
//     const userId = req.user.userId; // 👈 correctly get userId
//     return this.taskService.createTask(title, userId);
//   }

//   @UseGuards(JwtAuthGuard)
//   @Get()
//   getTasks(@Request() req: any) {
//     const userId = req.user.userId; // 👈 use userId instead of req.user
//     return this.taskService.getTasks(userId);
//   }
// }


import { Controller, Post, Get, Body, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @Roles('Admin', 'Owner')
  createTask(@Body('title') title: string, @Request() req: any) {
    const userId = req.user.userId;
    return this.taskService.createTask(title, userId);
  }

  @Get()
  @Roles('Viewer', 'Admin', 'Owner')
  getTasks(@Request() req: any) {
    const userId = req.user.userId;
    return this.taskService.getTasks(userId);
  }
}
