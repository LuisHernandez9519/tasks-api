import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { SubTasksModule } from './modules/sub-tasks/subtasks.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TasksModule,
    SubTasksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number;
  constructor(private configureService: ConfigService) {
    AppModule.port = this.configureService.get('PORT');
  }
}
