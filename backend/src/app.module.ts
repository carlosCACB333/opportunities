import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { envs } from './config/envs';
import { OpportunitiesModule } from './opportunities/opportunities.module';
import { SeedModule } from './seed/seed.module';

@Module({
  imports: [
    OpportunitiesModule,
    MongooseModule.forRoot(envs.MONGO_URL),
    SeedModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
