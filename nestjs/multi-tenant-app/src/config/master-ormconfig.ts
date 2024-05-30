import { Tenant } from 'src/entities/tenant.entity';
import { DataSourceOptions } from 'typeorm';

export const masterOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Code@123',
  database: 'multi-tenant-app',
  entities: [Tenant],
  synchronize: true,
};
