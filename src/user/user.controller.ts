import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Query,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body) {
    console.log(body);
    return await this.userService.login(body);
  }

  @Post('sign-up')
  async create(@Body() body) {
    return await this.userService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser() {
    return this.userService.findAll();
  }
}
