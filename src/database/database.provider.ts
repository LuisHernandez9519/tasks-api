import { DynamicModule } from '@nestjs/common';

import { ConfigurationEnum } from '../modules/config/config.keys';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Environment } from 'src/common/enums/environment.enum';
import { ConnectionOptions } from 'tls';
//import { ConfigService } from '@nestjs/config';
import { ConfigService } from '../modules/config/config.service';
import { ConfigModule } from '../modules/config/config.module';

export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      const isDevelopmentEnv =
        config.get('NODE_ENV') !== Environment.Production;

      const dbConfig = {
        type: 'postgres',
        host: config.get(ConfigurationEnum.DB_HOST),
        port: +config.get(ConfigurationEnum.DB_PORT),
        database: config.get(ConfigurationEnum.DB_NAME),
        autoLoadEntities: true,
        synchronize: isDevelopmentEnv,
        entities: [__dirname + '../**/*.entity{.ts,.js}'],
        username: config.get(ConfigurationEnum.DB_USER),
        password: config.get(ConfigurationEnum.DB_PASSWORD),
        //logging: config.get('DB_LOGGIN')
      } as ConnectionOptions;

      return dbConfig;
    },
  }),
];
