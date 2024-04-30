import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationError, ValidationPipe } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import * as express from 'express'

import {
  ValidationException,
  ValidationFilter,
} from './users/util/filter.validation'
import { join } from 'path'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  //app.useStaticAssets(join(__dirname, '..', 'uploads'));
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

  app.setGlobalPrefix('/api')
  app.useGlobalFilters(new ValidationFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      exceptionFactory: (errors: ValidationError[]) => {
        const errMsg = {}
        errors.forEach((err) => {
          errMsg[err.property] = [...Object.values(err.constraints)]
        })
        return new ValidationException(errMsg)
      },
    }),
  )
  app.enableCors({
    origin: 'http://localhost:4200', // Replace with your Angular app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  })

  await app.listen(3000)
}
bootstrap()
