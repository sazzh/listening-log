import pg from 'pg';

// Create a new pool instance to manage PostgreSQL connections
// Pool creates and resuses multiple connections automatically
export const db = new pg.Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
});