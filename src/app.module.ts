import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { SubTasksModule } from './modules/sub-tasks/subtasks.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { ConfigurationEnum } from "./modules/config/config.keys";

@Module({
  imports: [
    //ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    TasksModule,
    SubTasksModule,
    UsersModule,
    AuthModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  static PORT: string | number;
  constructor(private readonly config: ConfigService) {
    AppModule.PORT = config.get(ConfigurationEnum.PORT);
  }
}
