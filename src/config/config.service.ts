// Packages
import { readFileSync } from 'fs';
import { parse } from 'dotenv';
import { ObjectSchema, object, string, number } from '@hapi/joi';

export type EnvConfig = Record<string, string>;

export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(filePath: string) {
    const config = parse(readFileSync(filePath));
    this.envConfig = this.validateInput(config);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: ObjectSchema = object({
      NODE_ENV: string()
        .valid('development', 'production', 'test', 'provision')
        .default('development'),
      PORT: number().default(3000)
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }
}
