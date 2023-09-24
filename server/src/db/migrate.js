import dotenv from 'dotenv';
import Knex from 'knex';
import logger from '../utils/logger.js';

// You can dynamically pass the database name
// as a command-line argument, or obtain it from
// a .env file
dotenv.config();

const databaseName = process.env.POSTGRES_DB || 'tracker2';

const connection = {
  host: process.env.POSTGRES_HOST || 'localhost',
  user: process.env.POSTGRES_USER || 'jeriljose',
  password: process.env.POSTGRES_PASSWORD || 'johnjose',
};

async function main() {
  let knex = Knex({
    client: 'postgresql',
    connection,
  });

  // Lets create our database if it does not exist
  try {
    const databaseExists = await knex.raw(
      'SELECT 1 FROM pg_database WHERE datname = ?',
      [databaseName],
    );

    if (databaseExists.rows.length === 0) {
      // Create the database if it doesn't exist
      await knex.raw(`CREATE DATABASE ${databaseName}`);
      logger.log(`Database "${databaseName}" created successfully.`);
    } else {
      logger.log(`Database "${databaseName}" already exists.`);
    }
  } catch (error) {
    logger.error('Error creating database:', error);
  }

  // Now that our database is known, let's create another knex object
  // with database name specified so that we can run our migrations
  knex = Knex({
    client: 'postgresql',
    connection: {
      host: process.env.POSTGRES_HOST || 'localhost',
      user: process.env.POSTGRES_USER || 'jeriljose',
      password: process.env.POSTGRES_PASSWORD || 'johnjose',
      database: databaseName,
    },
    migrations: {
      directory: './src/db/migrations', // Specify the correct path to your migrations directory
    },
  });

  // Now we can happily run our migrations
  try {
    await knex.migrate.latest();
    logger.log(`Tables created successfully.`);
  } catch (err) {
    logger.error('Unable to perform migration', err);
  }

  // Done!!
}

main().catch(logger.log).then(process.exit);
