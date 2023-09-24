import dotenv from 'dotenv';

dotenv.config();
// Update with your config settings.
const knexFile = {
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      // connectionString: 'postgresql://jeriljose:johnjose@localhost:5432/tracker',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: process.env.POSTGRES_PORT || '5432',
      user: process.env.POSTGRES_USER || 'jeriljose',
      password: process.env.POSTGRES_PASSWORD || 'johnjose',
      database: process.env.POSTGRES_DB || 'tracker',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_tracker_migrations',
    },
  },
};

export default knexFile;
