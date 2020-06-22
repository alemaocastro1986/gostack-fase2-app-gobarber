module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'gostack_gobarber',
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/infra/data/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/infra/data/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: 'localhost',
    port: 27017,
    database: 'gobarber',
    useUnifiedTopology: 'true',
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];
