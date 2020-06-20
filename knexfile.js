
const pgConnection = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations:{
      directory: './data/migrations',
    },
    seeds:{
      directory: './data/seeds',
    },
    connection: {
      filename: './data/users.db3'
    },
    pool:{
      afterCreate: (conn,done)=>{
        conn.run('Pragma foreign_keys= ON',done);
      }
    }
  },

  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/test.db3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
    pool:{
      afterCreate: (conn,done)=>{
        conn.run('Pragma foreign_keys= ON',done);
      }
    }
  },

  production: {
    client: 'pg',
    connection: pgConnection,
    useNullAsDefault: true,
    pool:{
      afterCreate: (conn,done)=>{
        conn.run('Pragma foreign_keys= ON',done);
      }
    }
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    migrations: {
      directory: './data/migrations',
    },
    seeds:{
      directory: './data/seeds',
    },
  },
};
