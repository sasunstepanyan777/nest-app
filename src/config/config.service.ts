// Packages
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { ObjectSchema, object, string, number } from '@hapi/joi';

import { ConfigEnum } from './config.enum';

export type EnvConfig = Record<string, string | number>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = parse(readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: ConfigEnum): string | number {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: ObjectSchema = object({
      NODE_ENV: string()
        .valid('development', 'test', 'production')
        .default('development'),
      PORT: number().default(3000),
      DATABASE_HOST: string().required().default('localhost'),
      DATABASE_PORT: number().required().default(3306),
      DATABASE_USERNAME: string().required().default('root'),
      DATABASE_PASSWORD: string().allow('').default(''),
      DATABASE_NAME: string().required().default('nest-app'),
      JWT_SIGN_ALGORITHM: string().required().valid('RS256', 'HS256').default('RS256'),
      JWT_EXPIRE: string().required().default('1h'),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
