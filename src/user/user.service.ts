import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Cart } from 'src/pizza/entities/cart.entity';
import { Pizza } from 'src/pizza/entities/pizza.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(Cart.name)
    private readonly cartModel: Model<Cart>,
    @InjectModel(Pizza.name)
    private readonly pizzaModel: Model<Pizza>,
  ) {}

  async findOne(email: string) {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new HttpException(`user #${email} not found`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async validateUser(userObj) {
    const user = await this.userModel.findOne({ email: userObj.email });
    if (user && user.password === userObj.password) {
      const { ...result } = user;
      return result;
    }
    return BadRequestException;
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

  async addToCart(userObj) {
    const exist = await this.pizzaModel.findOne({ pizzaName: userObj.pizza });
    if (exist) {
      return new this.cartModel({
        ...userObj,
      }).save();
    }
    return NotFoundException;
  }

  async removeItem(id: string) {
    const pizza = await this.cartModel.findOne({ _id: id }).exec();
    if (!pizza) {
      throw new HttpException(`Pizza #${id} not found`, HttpStatus.NOT_FOUND);
    }
    return pizza.remove();
  }

  async showCartItems(email) {
    return await this.cartModel.find({ email: email });
  }
}
