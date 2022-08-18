require('dotenv').config();

const config = {
    development: {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    test: {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    },
    production: {
        username: process.env.DB_USER_NAME,
        password: process.env.DB_USER_PWD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }/*
    production: {
        use_env_variable: process.env.CLEARDB_DATABASE_URL,
        dialect: process.env.DB_DIALECT,
        logging: true,
    },*/
};

module.exports = config;
