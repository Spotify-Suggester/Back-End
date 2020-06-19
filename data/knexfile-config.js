const knex=require('knex');
const config=require('../knexfile.js');
const environment=process.env.DB_environment || 'development';
const db=knex(config[environment]);

module.exports=db;