import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pizza } from './entities/pizza.entity';
import { MailgunService } from '@nextnm/nestjs-mailgun';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza.name)
    private readonly pizzaModel: Model<Pizza>,
    private mailgunService: MailgunService,
  ) {}

  async addPizza(pizzaObj) {
    return new this.pizzaModel({
      ...pizzaObj,
    }).save();
  }

  async findAll() {
    return await this.pizzaModel.find({}).exec();
  }

  async sendEmail() {
    const domain = 'sandbox3be3c65c89da4116bebca56609156a94.mailgun.org';
    const data = {
      from: 'kmohdmoazzam70@gmail.com',
      to: 'kmohdmoazzam70@gmail.com',
      subject: 'Testing Mail',
      text: 'This is a test email',
    };
    console.log(domain);
    console.log(data);
    return await this.mailgunService.createEmail(domain, data);
  }
}
