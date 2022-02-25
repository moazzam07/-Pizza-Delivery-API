import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MailgunModule } from '@nextnm/nestjs-mailgun';
import { JwtStrategy } from 'src/user/jwt.strategy';
import { Pizza, pizzaSchema } from './entities/pizza.entity';
import { PizzaController } from './pizza.controller';
import { PizzaService } from './pizza.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizza.name, schema: pizzaSchema }]),
    MailgunModule.forAsyncRoot({
      useFactory: async () => {
        return {
          username: 'moazzam',
          key: '4e89dde30dbd074f4659bcc7ccee5ef1-b2f5ed24-4d95b3e8',
        };
      },
    }),
  ],
  controllers: [PizzaController],
  providers: [PizzaService, JwtStrategy],
})
export class PizzaModule {}
