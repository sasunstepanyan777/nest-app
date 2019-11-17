// Packages
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { ObjectSchema, object, string, number } from '@hapi/joi';

export type EnvConfig = Record<string, string | number>;

export interface IConfig {
  NODE_ENV: string;
  PORT: number;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  JWT_SIGN_ALGORITHM: string;
  JWT_EXPIRE: string | number;
  JWT_REFRESH_EXPIRE: string | number;
}

export class ConfigService {
  private readonly envConfig: IConfig;

  constructor(filePath: string) {
    const config = parse(readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  public get<K extends keyof IConfig>(key: K): IConfig[K] {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): IConfig {
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
      JWT_REFRESH_EXPIRE: string().required().default('1.5h')
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig as IConfig;
  }
}
