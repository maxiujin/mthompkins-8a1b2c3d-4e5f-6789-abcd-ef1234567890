import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { email: string; password: string; role?: string },
  ) {
    return this.userService.createUser(body.email, body.password, body.role);
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
