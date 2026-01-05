import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createTask(title: string, userId: number): Promise<Task> {
    // Check if user exists using a simple count or find
    const user = await this.userRepo.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`); // Returns 404 to Postman
    }

    // Create the task object and associate the user
    const task = this.taskRepo.create({
      title,
      user, // Pass the whole user object
    });

    return await this.taskRepo.save(task);
  }

  async getTasks(userId: number): Promise<Task[]> {
    // Filter tasks directly by the userId stored in the ManyToOne column
    return await this.taskRepo.find({
      where: { user: { id: userId } },
      relations: ['user'], // Includes user data in the response
    });
  }
}