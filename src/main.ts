import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config/swagger.config';
import { AllExceptionsFilter } from './exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      strategy: 'excludeAll',
      // excludeExtraneousValues: true,
    }),
  );

  configSwagger(app);

  await app.listen(3000);
}
bootstrap();
