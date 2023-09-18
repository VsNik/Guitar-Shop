import  {IsEnum, IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

enum Environment {
  Development = "development",
  Production = "production",
}

class EnvironmentVariables {
  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsNumber()
  PORT: number;

  @IsString()
  JWT_SECRET: string;

  @IsString()
  DATABASE_URL: string;

  @IsString()
  UPLOAD_DIRECTORY_PATH: string;

  @IsString()
  SERVE_ROOT: string;

  @IsString()
  SERVER_URL: string;

  @IsString()
  CLIENT_URL: string

  @IsString()
  MAIL_SMTP_HOST: string

  @IsNumber()
  MAIL_SMTP_PORT: number

  @IsString()
  MAIL_USER_NAME: string

  @IsString()
  MAIL_USER_PASSWORD: string

  @IsString()
  MAIL_FROM: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config,{ enableImplicitConversion: true });
  const errors = validateSync(validatedConfig, { skipMissingProperties: false });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}


