import { Pool } from 'pg';

const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
	database: process.env.POSTGRES_DB,
	user: process.env.POSTGRES_USER,
	host: process.env.POSTGRES_HOST,
	password: `${process.env.POSTGRES_PASSWORD}`,
	port: Number(process.env.POSTGRES_PORT),
});

export const query = (text: any, params: any) => pool.query(text, params);
