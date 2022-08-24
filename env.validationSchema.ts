import * as joi from 'joi';
export const validationSchema = joi.object({
  NODE_ENV: joi
    .string()
    .valid('development', 'production', 'test', 'staging')
    .default('development'),
  PORT: joi.number().default(3033),
  MONGODB_PASSWORD: joi.string().default('password'),
  MONGODB_DBNAME: joi.string().default('catadoption'),
  MONGODB_HOST: joi.string().default('localhost'),
  MONGODB_USER: joi.string().default('catadoptionAdmin'),
  MONGODB_PORT: joi.number().default(27017),
  ADMIN_USER_PASSWORT: joi.string().default('password'),
  ADMIN_USER_EMAIL: joi.string().required(),
  JWT_SECRET: joi.string().required(),
});
