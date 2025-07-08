import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const config: DataSourceOptions = {
  type: 'sqlite',
  database: join(__dirname, '..', 'db', 'sql.sqlite'),
  synchronize: true, // Use true para desenvolvimento, depois altere para false em produção
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export default config;
