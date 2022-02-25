import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza } from './entities/pizza.entity';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza.name)
    private readonly pizzaModel: Model<Pizza>,
  ) {}

  async addPizza(pizzaObj) {
    return new this.pizzaModel({
      ...pizzaObj,
    }).save();
  }

  async findAll() {
    return await this.pizzaModel.find({}).exec();
  }
}
