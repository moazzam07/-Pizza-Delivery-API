import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private readonly pizzaService: PizzaService) {}

  @UseGuards(JwtAuthGuard)
  @Post('addItem')
  async addPizza(@Body() body) {
    return await this.pizzaService.addPizza(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('menu-items')
  getMenu() {
    return this.pizzaService.findAll();
  }
}
