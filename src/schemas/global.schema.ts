import { z } from 'zod';
import { passwordSchema, stringField } from './common.schema';

export const env = z.object({
  PORT: stringField('PORT'),
  NODE_ENV: z.enum(['production', 'development'], {
    invalid_type_error: 'Provide valid type',
    required_error: 'NODE_ENV is required',
  }),

  ACCESS_SECRET_KEY: stringField('ACCESS_SECRET_KEY'),

  POSTGRES_HOST: stringField('POSTGRES_HOST'),
  POSTGRES_PORT: stringField('POSTGRES_PORT'),
  POSTGRES_USER: stringField('POSTGRES_USER'),
  POSTGRES_PASS: stringField('POSTGRES_PASS'),
  POSTGRES_NAME: stringField('POSTGRES_NAME'),
});

export type Env = z.infer<typeof env>;
