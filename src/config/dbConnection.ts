const { Client } = require('pg');
require('dotenv').config();

interface EnvConfig {
    DATABASE_USER: string;
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_PORT: number;
    DATABASE_NAME: string;
}

const createDatabase = async (): Promise<void> => {
    const {
        DATABASE_USER,
        DATABASE_HOST,
        DATABASE_PASSWORD,
        DATABASE_PORT,
        DATABASE_NAME,
    } = process.env;

    const client = new Client({
        user: DATABASE_USER,
        host: DATABASE_HOST,
        password: DATABASE_PASSWORD,
        port: DATABASE_PORT,
    });

    try {
        await client.connect();

        const res = await client.query(
            `SELECT 1 FROM pg_database WHERE datname=$1`,
            [DATABASE_NAME]
        );

        if (res.rowCount === 0) {
            await client.query(`CREATE DATABASE ${DATABASE_NAME}`);
            console.log(`Database ${DATABASE_NAME} created successfully.`);
        } else {
            console.log(`Database ${DATABASE_NAME} already exists.`);
        }
    } catch (err) {
        console.error('Error creating database:', err);
    } finally {
        await client.end();
    }
};

module.exports = createDatabase;
