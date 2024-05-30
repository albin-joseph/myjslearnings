import { User } from 'src/entities/user.entity';
import { DataSourceOptions } from 'typeorm';

export const createTenantOrmConfig = (dbName: string): DataSourceOptions => ({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Code@123',
  database: dbName,
  entities: [User],
  synchronize: true,
});
