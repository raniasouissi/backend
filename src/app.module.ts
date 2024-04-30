import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ClientsModule } from './client/clients.module'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config'
import { VendeursModule } from './vendeur/vendeur.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { AdminsModule } from './admin/admin.module'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { CarModule } from './car/car.module'
import { PromotionModule } from './promotion/promotion.module'

import * as path from 'path'

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
          user: 'c74817e4f4e39f',
          pass: '364bf179ca6d8d',
        },
      },
      defaults: {
        from: '"No Reply" <CarMasters@gmail.com>',
      },
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),

    AuthModule,

    ClientsModule,

    UsersModule,

    VendeursModule,

    AdminsModule,

    CarModule,

    PromotionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
