import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, cartSchema } from 'src/pizza/entities/cart.entity';
import { Pizza, pizzaSchema } from 'src/pizza/entities/pizza.entity';
import { User, userSchema } from './entities/user.entity';
import { JwtStrategy } from './jwt.strategy';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema,
      },
      {
        name: Cart.name,
        schema: cartSchema,
      },
      {
        name: Pizza.name,
        schema: pizzaSchema,
      },
    ]),
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
})
export class UserModule {}
