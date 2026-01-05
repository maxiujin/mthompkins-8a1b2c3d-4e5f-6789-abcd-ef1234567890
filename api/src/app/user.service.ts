import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(email: string, password: string, role = 'Viewer') {
    const user = this.userRepository.create({ email, password, role });
    return this.userRepository.save(user);
  }

  async getAllUsers() {
    return this.userRepository.find();
  }
}
