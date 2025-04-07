import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Api de oportunidades')
  .setDescription('Api de oportunidades')
  .setVersion('1.0')
  .build();
