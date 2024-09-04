import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { DATABASE_TYPE, DEV, ENTITIES_PATH } from '../constants';

export const getTypeOrmConfig = (
  env: NodeJS.ProcessEnv,
): TypeOrmModuleOptions => {
  return {
    type: DATABASE_TYPE,
    host: env.ORM_HOST,
    port: Number(env.ORM_PORT),
    username: env.ORM_USERNAME,
    password: `${env.ORM_PASSWORD}`,
    database: env.ORM_DATABASE,
    entities: ENTITIES_PATH,
    synchronize: env.ORM_ENVIRONMENT == DEV,
  };
};
