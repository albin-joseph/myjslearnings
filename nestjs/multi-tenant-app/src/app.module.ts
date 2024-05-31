import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { masterOrmConfig } from './config/master-ormconfig';
import { TenantModule } from './modules/tenant/tenant.module';
import { TenantMiddleware } from './middleware/tenant.middleware';
import { TenantService } from './modules/tenant/tenant.service';
import { Tenant } from './entities/tenant.entity';
import { AuthModule } from './modules/auth/auth.module';
import { configValidationSchema } from './common/config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      validationSchema: configValidationSchema
    }),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'Code@123',
          database: 'multi-tenant-app',
          entities: [__dirname + '/../entities/*.entity{.ts,.js}'],
          synchronize: true,
          autoLoadEntities: true
        }
      }
    }),
    TenantModule,
    AuthModule,
    TypeOrmModule.forFeature([Tenant]),
  ],
  providers: [TenantService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
