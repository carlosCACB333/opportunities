import { plainToInstance } from 'class-transformer';
import { IsNumber, IsString, MinLength, validateSync } from 'class-validator';

try {
  process.loadEnvFile();
} catch {
  // No .env file
}

class Env {
  @IsNumber()
  PORT: number;

  @IsString()
  @MinLength(1)
  MONGO_URL: string;
}

const validateEnv = (): Env => {
  const env = plainToInstance(Env, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(env, { skipMissingProperties: false });

  if (errors.length > 0) {
    const messages = errors.map((error) => error.toString());
    console.error('⚠️ Invalid environment variables', messages);
    process.exit(1);
  }
  return env;
};

export const envs = validateEnv();
