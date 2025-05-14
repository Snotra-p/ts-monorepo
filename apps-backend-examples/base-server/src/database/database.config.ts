import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseEnvSchema = z.object({
  DB_TYPE: z.string().default('mysql'),
  DB_HOST: z.string(),
  DB_PORT: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((n) => !isNaN(n) && n >= 0 && n <= 65535),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
  DB_USERNAME: z.string(),
  DB_SYNCHRONIZE: z.string().transform((val) => val === 'true'),
  DB_MAX_CONNECTIONS: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default(100),
  DB_SSL_ENABLED: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  DB_REJECT_UNAUTHORIZED: z
    .string()
    .transform((val) => val === 'true')
    .optional(),
  DB_CA: z.string().optional(),
  DB_KEY: z.string().optional(),
  DB_CERT: z.string().optional(),
});

export type DatabaseConfig = z.infer<typeof databaseEnvSchema>;

export default registerAs<DatabaseConfig>('database', (): DatabaseConfig => {
  const env = databaseEnvSchema.parse({ ...process.env });

  return {
    DB_TYPE: env.DB_TYPE,
    DB_HOST: env.DB_HOST,
    DB_PORT: env.DB_PORT,
    DB_USERNAME: env.DB_USERNAME,
    DB_PASSWORD: env.DB_PASSWORD,
    DB_NAME: env.DB_NAME,
    DB_SYNCHRONIZE: env.DB_SYNCHRONIZE,
    DB_MAX_CONNECTIONS: env.DB_MAX_CONNECTIONS,
    DB_SSL_ENABLED: env.DB_SSL_ENABLED,
    DB_REJECT_UNAUTHORIZED: env.DB_REJECT_UNAUTHORIZED,
    DB_CA: env.DB_CA,
    DB_KEY: env.DB_KEY,
    DB_CERT: env.DB_CERT,
  };
});
