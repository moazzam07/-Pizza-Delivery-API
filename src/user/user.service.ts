import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  usersService: any;
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new HttpException(`user #${email} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async create(userObj) {
    try {
      const { name, email, address, password, street } = userObj;
      const userExist = await this.userModel.findOne({ email: email }).exec();
      if (userExist != null) {
        throw new BadRequestException('user already exist');
      }
      return new this.userModel({
        name: userObj.name,
        email: userObj.email,
        address: userObj.address,
        password: userObj.password,
        street: userObj.street,
      }).save();
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(user) {
    const payload = { name: user.name };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    return await this.userModel.find({}).exec();
  }
}
